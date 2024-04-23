import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function assingSeat(app: FastifyInstance){
    app.post("/flight/:flyCode/seat/:passagerId", async(req, res) => {
        
        const passagerIdSchema = z.object({
            passagerId: z.string(),
            flyCode: z.string()
        })

        const { passagerId, flyCode } = passagerIdSchema.parse(req.params)

        const [passager, airplane] = await Promise.all([
           prisma.passager.findUnique({
            where: {
                id: passagerId
            }
           }),
            prisma.airPlane.findUnique({
                where: {
                    flyCode
                }
            })
        ])
        if(!passager || !airplane){
            throw new Error("Could not find passager or plane")
        }

        await prisma.planeSeat.create({
            data: {
                airPlaneId: airplane.id,
                passagerId: passager.id
            }
        })


        return res.status(201).send({message: `Seat assigned for flight ${airplane.flyCode} was suceded`})
    })
}