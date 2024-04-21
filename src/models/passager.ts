
export interface PassagerProps {
    name: string
    email: string

    seat?: any
}

export class Passager{
    props: PassagerProps

    constructor(props: PassagerProps){
        this.props = props
    }
}