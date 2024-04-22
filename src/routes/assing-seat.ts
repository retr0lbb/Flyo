import { FastifyInstance } from "fastify";
import { Passager } from "../schemas/passager";
import { string, z } from "zod";

export async function assingSeat(app: FastifyInstance){
    app.post("/passager/:passagerId/seat", async(req, res) => {
        
        const passagerIdSchema = z.object({
            passagerId: z.string()
        })

        const {passagerId} = passagerIdSchema.parse(req.params)
        
        const passager = await Passager.findById(passagerId)

        if(!passager){
            throw new Error("Could not find passager")
        }

        return passager
    })
}