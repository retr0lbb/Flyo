import { AirPlane } from "./models/plane.class"
import {Passager, PassagerProps} from "./models/passager"

const boeing = new AirPlane({destiny: "Cancún", maximunNumberOfPassagers: 120, model: "747"})
const henrique = new Passager({email: "retr0lbb@gmail.com", name: "Henrique Barbosa Sampaio"})

console.log(henrique)