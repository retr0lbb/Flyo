import { Passager } from "./passager"

export interface PlaneSeatProps {
    row: number;
    seat: "A" | "B" | "C" | "D" | "E"| "F";
    price: number;
    signedPerson?: Passager | null
}


export class PlaneSeat{
    props: PlaneSeatProps
    

    constructor(props: PlaneSeatProps){
        this.props = props
        this.props.signedPerson = null
    }
}