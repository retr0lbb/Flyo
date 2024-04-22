import { FastifyInstance } from "fastify";
import {z} from "zod"
import { AirPlane } from "../schemas/plane.class";

export async function CreatePlane(app: FastifyInstance){
    app.post("/plane", async(req, res)=>{
        const createPlaneBodySchema = z.object({
            maximunOfPassagers: z.number().int().positive().default(0),
            destiny: z.string(),
            model: z.string()
        })

        const {destiny, maximunOfPassagers, model} = createPlaneBodySchema.parse(req.body)

        const plane = new AirPlane({destiny, maximunNumberOfPassagers: maximunOfPassagers, model })

        const result = await plane.create();

        return res.status(201).send({result})
    })
}