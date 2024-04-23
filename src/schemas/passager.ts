import { prisma } from "../lib/prisma"

export interface PassagerProps {
    name: string
    email: string
    id?: string
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
    static async getPassagers(){
        const passagers =  await prisma.passager.findMany()

        return passagers
    }

    async create(){
        const createdPassager = await prisma.passager.create({
            data: {
                email: this.props.email,
                name: this.props.name,
            }
        });

        return createdPassager;
    }
}