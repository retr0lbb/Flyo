import { Passager } from "./passager"

export interface PlaneSeatProps {
    id: number
    airPlaneid: string
    signedPerson?: Passager | null
}


export class PlaneSeat{
    props: PlaneSeatProps
    

    constructor(props: PlaneSeatProps){
        this.props = props
        this.props.signedPerson = null
    }
}