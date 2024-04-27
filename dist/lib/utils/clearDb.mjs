import {
  prisma
} from "../../chunk-YVGXYLIE.mjs";
import {
  __async
} from "../../chunk-WDFZ2WQK.mjs";

// src/lib/utils/clearDb.ts
function clearDb() {
  return __async(this, null, function* () {
    yield prisma.airPlane.deleteMany();
    const [panes, people] = yield Promise.all([
      prisma.airPlane.deleteMany(),
      prisma.passager.deleteMany(),
      prisma.planeSeat.deleteMany(),
      prisma.flight.deleteMany()
    ]);
    return [panes, people];
  });
}
console.log(clearDb().then((result) => {
  console.log(result);
}));
