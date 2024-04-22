import fastify from "fastify";
import {getAirplane} from "./routes/get-airplane"
import { CreatePlane } from "./routes/create-plane";


const app = fastify()
app.register(getAirplane)
app.register(CreatePlane)

app.listen({
    port: 3333
})
.then(() => {
    console.log("Http Server running")
})