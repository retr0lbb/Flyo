import { FastifyInstance } from "fastify";
import {z}from "zod";
import { AirPlane } from "../schemas/plane.class";

export default async function deletePlane(app: FastifyInstance){
    app.delete("/plane/:id", async(req, res) =>{
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        try {
            const { id } = paramsSchema.parse(req.params)
            await AirPlane.delete(id)

            return res.status(200).send("ok")
        } catch (error) {
            throw new Error("Could not delet plane")
        }
    })
}