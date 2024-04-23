import { FastifyInstance } from "fastify";
import {z}from "zod";
import { prisma } from "../lib/prisma";

export default async function deletePlane(app: FastifyInstance){
    app.delete("/plane/:id", async(req, res) =>{
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        try {
            const { id } = paramsSchema.parse(req.params)
            await prisma.airPlane.delete({
                where: {
                    id: id
                }
            })

            return res.status(200).send("ok")
        } catch (error) {
            throw new Error("Could not delet plane")
        }
    })
}