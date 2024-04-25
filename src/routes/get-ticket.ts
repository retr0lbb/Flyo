import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getTicket(app: FastifyInstance){
    app.get("/passager/:passagerId/flight/:flightId/ticket", async(request, reply)=>{
        
        const bodyParams = z.object({
            passagerId: z.string(),
            flightId: z.string()
        })
        
        const {flightId, passagerId} = bodyParams.parse(request.params)
        

        const [ passager, flight ] = await Promise.all([
            prisma.passager.findUnique({
                where: {
                    id: passagerId
                },
                select: {
                    name: true,
                    flightId: true,
                    seats: {
                        select: {
                            rowCode: true,
                            seatCode: true
                        }
                    }
                }
            }),

            prisma.flight.findUnique({
                where: {
                    id: flightId
                },
                select: {
                    dateOfflight: true,
                    destiny: true,
                    Plane: {
                        select: {
                            airPlaneModel: true
                        }
                    }
                }
            })
        ])

        if(!passager || !flight){
            return reply.status(404).send({message: "Passager or Flight not encontered"})
        }

        const ticket = {
            passager_name: passager.name,
            flight_id: passager.flightId,
            seat_code: `${passager.seats[0].seatCode}${passager.seats[0].rowCode}`,
            flight_date: flight.dateOfflight,
            flight_destiny: flight.destiny,
            plane_model: flight.Plane?.airPlaneModel,
            checkin_url: "something in the way"
        }


        return reply.status(200).send({ticket})

    })
}