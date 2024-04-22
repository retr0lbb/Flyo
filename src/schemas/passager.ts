import { prisma } from "../lib/prisma"

export interface PassagerProps {
    name: string
    email: string
    id: string
    seat?: any
}

export class Passager{
    props: PassagerProps

    constructor(props: PassagerProps){
        this.props = props
    }


    static async findById(id: string){
        const passager = await prisma.passager.findUnique({
            where: {
                id
            }
        })

        return passager
    }
}