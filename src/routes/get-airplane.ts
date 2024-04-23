import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

export async function getAirplane(app: FastifyInstance) {
    app.get("/plane", async(req, res)=>{

        const planes = await prisma.airPlane.findMany()

        if(!planes){
            return res.status(404).send({message: "No planes finded"})
        }

        return res.status(200).send({planes})
    })
}