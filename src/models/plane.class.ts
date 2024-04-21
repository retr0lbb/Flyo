import { PlaneSeat } from "./plane-seat.class";
import { Passager } from "./passager";

export interface AirPlaneProps {
    maximunNumberOfPassagers: number
    destiny: any
    model: string
    seats?: PlaneSeat[]
}

export class AirPlane{

    private props: AirPlaneProps

    constructor(props: AirPlaneProps){
        this.props = props
        this.props.seats = []
        this.generateSeats()
    }

    get seats(): PlaneSeat[]{
        if(this.props.seats == undefined){
            this.props.seats = []
        }
        return this.props.seats
    }

    private generateSeats(){
        const numberOfRows = this.props.maximunNumberOfPassagers / 6

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


