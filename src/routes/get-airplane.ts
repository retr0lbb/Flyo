import { FastifyInstance } from "fastify"
import { AirPlane } from "../schemas/plane.class"

export async function getAirplane(app: FastifyInstance) {
    app.get("/plane", async(req, res)=>{
        const planes = await AirPlane.find()

        if(!planes){
            return res.status(404).send({message: "No planes finded"})
        }

        return res.status(200).send({planes})
    })
}