import {
  prisma
} from "./chunk-YVGXYLIE.mjs";
import {
  __async
} from "./chunk-WDFZ2WQK.mjs";

// src/routes/check-in-flight.ts
import { z } from "zod";
function checkInForFlight(app) {
  return __async(this, null, function* () {
    app.get("/flight/:flightId/passager/:passagerId/check-in", (request, reply) => __async(this, null, function* () {
      const params = z.object({
        flightId: z.string(),
        passagerId: z.string().uuid({ message: "Passager id is not on type uuid" })
      });
      const { flightId, passagerId } = params.parse(request.params);
      const [flight, passager] = yield Promise.all([
        prisma.flight.findUnique({
          where: {
            id: flightId
          }
        }),
        prisma.passager.findUnique({
          where: {
            id: passagerId
          }
        })
      ]);
      if (!passager || !flight) {
        return reply.status(404).send({ message: "Flight or passager not founded" });
      }
      yield prisma.checkIn.create({
        data: {
          passagerId
        }
      });
      return reply.status(200).send({ message: "Checked in sucessfoly" });
    }));
  });
}

export {
  checkInForFlight
};
