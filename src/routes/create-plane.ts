import { FastifyInstance } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma";


export async function CreatePlane(app: FastifyInstance){
    app.post("/plane", async(req, res)=>{
        const createPlaneBodySchema = z.object({
            maximunOfPassagers: z.number().int().positive().default(0),
            destiny: z.string(),
            model: z.string()
        })

        const {destiny, maximunOfPassagers, model} = createPlaneBodySchema.parse(req.body)

        const result = await prisma.airPlane.create({
            data: {
                airPlaneModel: model,
                maximunNumberOfPassagers: maximunOfPassagers
            }
        })

        return res.status(201).send({result})
    })
}