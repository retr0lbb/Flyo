import {
  buyTicket
} from "./chunk-PKJXX7E5.mjs";
import {
  checkInForFlight
} from "./chunk-C3T4ZXRQ.mjs";
import {
  createFlight
} from "./chunk-S54Y4SVW.mjs";
import "./chunk-JF652HHP.mjs";
import {
  CreatePlane
} from "./chunk-JRCIBLOZ.mjs";
import {
  getTicket
} from "./chunk-ZOCCPHTA.mjs";
import "./chunk-YVGXYLIE.mjs";
import "./chunk-WDFZ2WQK.mjs";

// src/server.ts
import fastify from "fastify";
var app = fastify();
app.register(CreatePlane);
app.register(createFlight);
app.register(buyTicket);
app.register(getTicket);
app.register(checkInForFlight);
app.listen({
  port: 3333
}).then(() => {
  console.log("Http Server running");
});
