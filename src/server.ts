import fastify from "fastify";
import { CreatePlane } from "./routes/create-plane";
import { createFlight } from "./routes/create-flight";
import { buyTicket } from "./routes/buy-ticket";
import { getTicket } from "./routes/get-ticket";


const app = fastify()

app.register(CreatePlane)
app.register(createFlight)
app.register(buyTicket)
app.register(getTicket)

app.listen({
    port: 3333
})
.then(() => {
    console.log("Http Server running")
})