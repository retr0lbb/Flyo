import { FastifyInstance } from "fastify";
import {z} from "zod"

export async function CreatePlane(app: FastifyInstance){
    app.post("/plane", (req, res)=>{
        const createPlaneBodySchema = z.object({
            
        })
    })
}