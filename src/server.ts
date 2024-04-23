import fastify from "fastify";
import {getAirplane} from "./routes/get-airplane"
import { CreatePlane } from "./routes/create-plane";
import deletePlane from "./routes/delete-plane";
import { assingSeat } from "./routes/assing-seat";
import { createPassager } from "./routes/create-passager";


const app = fastify()
app.register(getAirplane)
app.register(CreatePlane)
app.register(deletePlane)
app.register(assingSeat)
app.register(createPassager)

app.listen({
    port: 3333
})
.then(() => {
    console.log("Http Server running")
})