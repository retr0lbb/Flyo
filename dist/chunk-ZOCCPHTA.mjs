import {
  prisma
} from "./chunk-YVGXYLIE.mjs";
import {
  __async
} from "./chunk-WDFZ2WQK.mjs";

// src/routes/get-ticket.ts
import { z } from "zod";
function getTicket(app) {
  return __async(this, null, function* () {
    app.get("/passager/:passagerId/flight/:flightId/ticket", (request, reply) => __async(this, null, function* () {
      var _a;
      const bodyParams = z.object({
        passagerId: z.string(),
        flightId: z.string()
      });
      const { flightId, passagerId } = bodyParams.parse(request.params);
      const [passager, flight] = yield Promise.all([
        prisma.passager.findUnique({
          where: {
            id: passagerId
          },
          select: {
            name: true,
            flightId: true,
            seats: {
              select: {
                rowCode: true,
                seatCode: true
              }
            }
          }
        }),
        prisma.flight.findUnique({
          where: {
            id: flightId
          },
          select: {
            dateOfflight: true,
            destiny: true,
            Plane: {
              select: {
                airPlaneModel: true
              }
            }
          }
        })
      ]);
      if (!passager || !flight) {
        return reply.status(404).send({ message: "Passager or Flight not encontered" });
      }
      const ticket = {
        passager_name: passager.name,
        flight_id: passager.flightId,
        seat_code: `${passager.seats[0].seatCode}${passager.seats[0].rowCode}`,
        flight_date: flight.dateOfflight,
        flight_destiny: flight.destiny,
        plane_model: (_a = flight.Plane) == null ? void 0 : _a.airPlaneModel,
        checkin_url: "something in the way"
      };
      return reply.status(200).send({ ticket });
    }));
  });
}

export {
  getTicket
};
