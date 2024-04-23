import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createPassager(app: FastifyInstance){
    app.post("/passager", async (req, res)=>{
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email()
        })

        const {email, name} = bodySchema.parse(req.body);

        const passager = await prisma.passager.create({
            data: {
                email,
                name
            }
        })

        return res.status(201).send({passager})
    })
}