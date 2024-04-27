import {
  prisma
} from "./chunk-YVGXYLIE.mjs";
import {
  __async
} from "./chunk-WDFZ2WQK.mjs";

// src/routes/buy-ticket.ts
import { z } from "zod";
function buyTicket(app) {
  return __async(this, null, function* () {
    app.post("/flight/:flightId/ticket", (request, reply) => __async(this, null, function* () {
      var _a;
      const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        seatCode: z.string()
      });
      const paramsSchema = z.object({
        flightId: z.string()
      });
      const { email, name, seatCode } = bodySchema.parse(request.body);
      const { flightId } = paramsSchema.parse(request.params);
      const flight = yield prisma.flight.findUnique({
        where: {
          id: flightId
        },
        select: {
          id: true,
          Plane: {
            select: {
              captainName: true,
              id: true
            }
          }
        }
      });
      const match = seatCode.match(/^([A-Za-z]+)(\d+)$/);
      if (!match) {
        return reply.status(400).send({ message: "Incorrect seat code plis select other" });
      }
      const selectedSeat = yield prisma.planeSeat.findMany({
        where: {
          airPlaneId: (_a = flight == null ? void 0 : flight.Plane) == null ? void 0 : _a.id,
          rowCode: parseInt(match[2]),
          seatCode: match[1],
          passagerId: {
            equals: null
          }
        }
      });
      if (!selectedSeat[0]) {
        return reply.status(400).send({ message: "This seat is already been selected" });
      }
      const passager = yield prisma.passager.create({
        data: {
          email,
          name,
          flightId: flight == null ? void 0 : flight.id
        }
      });
      yield prisma.planeSeat.update({
        data: {
          passagerId: passager.id
        },
        where: {
          id: selectedSeat[0].id
        }
      });
      return reply.status(200).send({ selectedSeat });
    }));
  });
}

export {
  buyTicket
};
