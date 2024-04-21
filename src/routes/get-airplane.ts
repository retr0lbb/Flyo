import { FastifyInstance } from "fastify"
import { AirPlane } from "../models/plane.class"

export async function getAirplane(app: FastifyInstance) {
    app.get("/plane", (req, res)=>{

        const plane = new AirPlane({
            destiny: "Cancun", 
            maximunNumberOfPassagers: 100, 
            model: "519"
        })
        return res.status(200).send({plane})
    })
}