import { FastifyInstance } from "fastify";
import { z } from "zod";
import { Passager } from "../schemas/passager";

export async function createPassager(app: FastifyInstance){
    app.post("/passager", async (req, res)=>{
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email()
        })

        const {email, name} = bodySchema.parse(req.body);

       const passager = await new Passager({email, name}).create();

        return res.status(201).send({passager})
    })
}