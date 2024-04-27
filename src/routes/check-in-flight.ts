import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function checkInForFlight(app: FastifyInstance){

    app.get("/flight/:flightId/passager/:passagerId/check-in", async (request, reply) => {
        const params = z.object({
            flightId: z.string(),
            passagerId: z.string().uuid({message: "Passager id is not on type uuid"})
        })

        const {flightId, passagerId} = params.parse(request.params)

        const [flight, passager] = await Promise.all([
            prisma.flight.findUnique({
                where: {
                    id: flightId
                }
            }),

            prisma.passager.findUnique({
                where: {
                    id: passagerId 
                }
            })
        ])

        if(!passager || !flight){
            return reply.status(404).send({message: "Flight or passager not founded"})
        }

        await prisma.checkIn.create({
            data: {
                passagerId: passagerId
            }
        })

        return reply.status(200).send({message: "Checked in sucessfoly"})
    })
}