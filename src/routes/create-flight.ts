import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { generateId } from "../lib/utils/generate-small-id";

export async function createFlight(app: FastifyInstance){
    app.post("/flight", async (request, reply) => {
        const bodySchema = z.object({
            destiny: z.string(),
            dateOfFlight: z.string()
        })


        const { dateOfFlight, destiny } = bodySchema.parse(request.body);

        const date = new Date(dateOfFlight)

        const planes = await prisma.airPlane.findMany({
                where: {
                    isAvaiableToFlight: true
                }
            })


        if(planes.length == 0){
            return reply.status(400).send({message: "No planes Avaiable"})
        }

        try {
            const flight = await prisma.flight.create({
                data: {
                    dateOfflight: date,
                    id: generateId(),
                    destiny
                }
            })
    
            await prisma.airPlane.update({
                data: {
                    isAvaiableToFlight: false,
                    flightId: flight.id
                },
                where: {
                    id: planes[0].id
                }
            })

            return reply.status(201).send({message:"Flight created with sucess", flight, avaiablePlanes: planes}) 
        } catch (error) {
            if (error){
                throw new Error("Server error")
            }
        }

        
    })
}