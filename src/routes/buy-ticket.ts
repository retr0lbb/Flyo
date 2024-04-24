import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function buyTicket(app: FastifyInstance){
    app.post("/flight/:flightId/ticket", async (request, reply)=>{
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            seatCode: z.string()
        })

        const paramsSchema = z.object({
            flightId: z.string()
        })

        const { email, name, seatCode } = bodySchema.parse(request.body)
        const { flightId } = paramsSchema.parse(request.params)

        const flight = await prisma.flight.findUnique({
            where: {
                id: flightId
            },
            select: {
                id: true,
                Plane: {
                    select: {
                        captainName: true,
                        id: true
                    }
                }
            }
        })

        const passager = await prisma.passager.create({
            data:{
                email,
                name,
                flightId: flight?.id
            }
        })


        const match = seatCode.match(/^([A-Za-z]+)(\d+)$/)

        if(!match){
            return reply.status(400).send({message: "Incorrect seat code plis select other"})
        }

        const selectedSeat = await prisma.planeSeat.findFirst({
            where: {
                airPlaneId: flight?.Plane?.id,
                rowCode: parseInt(match[1]),
                seatCode: match[0]
            }
        });
        

        





        return reply.status(200).send({selectedSeat})
    })
}