import { AirPlane } from "./models/plane.class"
import {Passager, PassagerProps} from "./models/passager"

const boeing = new AirPlane({destiny: "Cancún", maximunNumberOfPassagers: 120, model: "747"})
const henrique = new Passager({email: "retr0lbb@gmail.com", name: "Henrique Barbosa Sampaio"})
const madona = new Passager({email: "Madona.com", name: "madonna maradona"})


const seatThatiWant = boeing.getSeat[0]
boeing.assingPersonToSeat(seatThatiWant, henrique)
boeing.assingPersonToSeat(seatThatiWant, madona)
console.log(seatThatiWant)