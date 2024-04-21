import {PlaneSeat, PlaneSeatProps} from "./plane-seat.class"
import {PassagerProps, Passager} from "./passager"


export interface AirPlaneProps {
    maximunNumberOfPassagers: number
    destiny: string
    model: string
}

export class AirPlane{
    private maximunNumberOfPassagers: number = 0
    private destiny: any
    private model: string
    private seats: PlaneSeat[] = []

    constructor({destiny, maximunNumberOfPassagers, model}: AirPlaneProps){
        this.model = model;
        this.destiny = destiny;
        this.maximunNumberOfPassagers = maximunNumberOfPassagers

        this.generateSeats()
    }

    get getSeat(): PlaneSeat[]{
        return this.seats
    }

    private generateSeats(){
        const numberOfRows = this.maximunNumberOfPassagers / 6

        for (let index = 1; index <= numberOfRows; index++) {
            const seat = new PlaneSeat({price: 1000, row: index, seat: "D"})
            this.seats.push(seat)
        }

        return this.seats
    }

    assingPersonToSeat(seat: PlaneSeat, person: Passager){
        if(seat.props.signedPerson !== null){
            throw new Error("This seat is already assigned")
        }

        seat.props.signedPerson = person
    }
}


const boeng = new AirPlane({destiny: "EUA", maximunNumberOfPassagers: 120, model: "Boeing 747"})


