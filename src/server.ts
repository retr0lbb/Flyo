import fastify from "fastify";
import {getAirplane} from "./routes/get-airplane"
import { CreatePlane } from "./routes/create-plane";
import deletePlane from "./routes/delete-plane";
import { assingSeat } from "./routes/assing-seat";


const app = fastify()
app.register(getAirplane)
app.register(CreatePlane)
app.register(deletePlane)
app.register(assingSeat)

app.listen({
    port: 3333
})
.then(() => {
    console.log("Http Server running")
})