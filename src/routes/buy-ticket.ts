import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function buyTicket(app: FastifyInstance){
    app.post("/flight/:flightId/ticket", async (request, reply)=>{
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email()
        })

        const paramsSchema = z.object({
            flightId: z.string()
        })

        const {email, name} = bodySchema.parse(request.body)
        const {flightId} = paramsSchema.parse(request.params)

        const flight = await prisma.flight.findUnique({
            where: {
                id: flightId
            },
            select: {
                id: true,
                Plane: {
                    select: {
                        captainName: true,
                        seats: true
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

        return reply.status(200).send("ok")
    })
}