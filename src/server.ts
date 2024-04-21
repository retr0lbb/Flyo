import fastify from "fastify";
import {getAirplane} from "./routes/get-airplane"

const app = fastify()
app.register(getAirplane)

app.listen({
    port: 3333
})
.then(() => {
    console.log("Http Server running")
})