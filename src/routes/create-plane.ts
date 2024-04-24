import { FastifyInstance } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma";


export async function CreatePlane(app: FastifyInstance){
    app.post("/plane", async(req, res)=>{
        const createPlaneBodySchema = z.object({
            maximunOfPassagers: z.number().int().positive().default(0),
            model: z.string(),
            captainName: z.string(),
            seatsPerRow: z.number().int().positive()

        })

        const { captainName, maximunOfPassagers, model, seatsPerRow } = createPlaneBodySchema.parse(req.body)

        const result = await prisma.airPlane.create({
            data: {
                airPlaneModel: model,
                maximunNumberOfPassagers: maximunOfPassagers,
                captainName: captainName,
            }
        })


        async function generatePlaneSeats(seatsPerRow: number){
            const numberOfRows = Math.floor(result.maximunNumberOfPassagers / seatsPerRow);

            for(let i = 0; i< numberOfRows; i++){
                await prisma.planeSeat.createMany({
                    data: [
                        {airPlaneId: result.id, rowCode: i+1, seatCode: "A"},
                        {airPlaneId: result.id, rowCode: i+1, seatCode: "B"},
                        {airPlaneId: result.id, rowCode: i+1, seatCode: "C"},

                        {airPlaneId: result.id, rowCode: i+1, seatCode: "D"},
                        {airPlaneId: result.id, rowCode: i+1, seatCode: "E"},
                        {airPlaneId: result.id, rowCode: i+1, seatCode: "F"}
                    ]
                })
            }
        }

        await generatePlaneSeats(seatsPerRow)

        return res.status(201).send({result})
    })
}