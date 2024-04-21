import { PassagerProps } from "./passager"

export interface PlaneSeatProps {
    row: number;
    seat: "A" | "B" | "C" | "D" | "E"| "F";
    price: number;
    signedPerson?: PassagerProps | null
}


export class PlaneSeat{
    props: PlaneSeatProps

    constructor(props: PlaneSeatProps){
        this.props = props
    }

    assingPersonToSeat(person: PassagerProps){
        if(this.props.signedPerson !== null){
            return new Error("This seat is already signed")
        }

        this.props.signedPerson = person
    }
}