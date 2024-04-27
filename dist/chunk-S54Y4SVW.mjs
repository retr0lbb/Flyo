import {
  generateId
} from "./chunk-JF652HHP.mjs";
import {
  prisma
} from "./chunk-YVGXYLIE.mjs";
import {
  __async
} from "./chunk-WDFZ2WQK.mjs";

// src/routes/create-flight.ts
import { z } from "zod";
function createFlight(app) {
  return __async(this, null, function* () {
    app.post("/flight", (request, reply) => __async(this, null, function* () {
      const bodySchema = z.object({
        destiny: z.string(),
        dateOfFlight: z.string()
      });
      const { dateOfFlight, destiny } = bodySchema.parse(request.body);
      const date = new Date(dateOfFlight);
      const planes = yield prisma.airPlane.findMany({
        where: {
          isAvaiableToFlight: true
        }
      });
      if (planes.length == 0) {
        return reply.status(400).send({ message: "No planes Avaiable" });
      }
      try {
        const flight = yield prisma.flight.create({
          data: {
            dateOfflight: date,
            id: generateId(),
            destiny
          }
        });
        yield prisma.airPlane.update({
          data: {
            isAvaiableToFlight: false,
            flightId: flight.id
          },
          where: {
            id: planes[0].id
          }
        });
        return reply.status(201).send({ message: "Flight created with sucess", flight, avaiablePlanes: planes });
      } catch (error) {
        if (error) {
          throw new Error("Server error");
        }
      }
    }));
  });
}

export {
  createFlight
};
