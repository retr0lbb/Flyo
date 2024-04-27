import {
  prisma
} from "./chunk-YVGXYLIE.mjs";
import {
  __async
} from "./chunk-WDFZ2WQK.mjs";

// src/routes/create-plane.ts
import { z } from "zod";
function CreatePlane(app) {
  return __async(this, null, function* () {
    app.post("/plane", (req, res) => __async(this, null, function* () {
      const createPlaneBodySchema = z.object({
        maximunOfPassagers: z.number().int().positive().default(0),
        model: z.string(),
        captainName: z.string(),
        seatsPerRow: z.number().int().positive()
      });
      const { captainName, maximunOfPassagers, model, seatsPerRow } = createPlaneBodySchema.parse(req.body);
      const result = yield prisma.airPlane.create({
        data: {
          airPlaneModel: model,
          maximunNumberOfPassagers: maximunOfPassagers,
          captainName
        }
      });
      function generatePlaneSeats(seatsPerRow2) {
        return __async(this, null, function* () {
          const numberOfRows = Math.floor(result.maximunNumberOfPassagers / seatsPerRow2);
          for (let i = 0; i < numberOfRows; i++) {
            yield prisma.planeSeat.createMany({
              data: [
                { airPlaneId: result.id, rowCode: i + 1, seatCode: "A" },
                { airPlaneId: result.id, rowCode: i + 1, seatCode: "B" },
                { airPlaneId: result.id, rowCode: i + 1, seatCode: "C" },
                { airPlaneId: result.id, rowCode: i + 1, seatCode: "D" },
                { airPlaneId: result.id, rowCode: i + 1, seatCode: "E" },
                { airPlaneId: result.id, rowCode: i + 1, seatCode: "F" }
              ]
            });
          }
        });
      }
      yield generatePlaneSeats(seatsPerRow);
      return res.status(201).send({ result });
    }));
  });
}

export {
  CreatePlane
};
