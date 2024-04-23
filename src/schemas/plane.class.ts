import { PlaneSeat } from "./plane-seat.class";
import { Passager } from "./passager";
import { prisma } from "../lib/prisma";
import { generateId } from "../lib/utils/generate-small-id";

export interface AirPlaneProps {
    maximunNumberOfPassagers: number;
    destiny: any;
    model: string;
    seats?: PlaneSeat[];
    id?: string
}

export class AirPlane {

    private props: AirPlaneProps;

    constructor(props: AirPlaneProps) {
        this.props = {
            ...props,
            seats: props.seats || [],
        };
    }

    get seats(): PlaneSeat[] {
        return this.props.seats ?? [];
    }

    //create an airplane
    async create() {
        try {
            const prismaReturn = await prisma.airPlane.create({
                data: {
                    airPlaneModel: this.props.model,
                    destiny: this.props.destiny,
                    maximunNumberOfPassagers: this.props.maximunNumberOfPassagers,
                    flyCode: generateId()
                }
            });
            this.props.id = prismaReturn.id

            return prismaReturn;
        } catch (error) {
            console.error("Error creating airplane:", error);
            throw error;
        }
    }

    static async find() {
        try {
            const returnedAirPlanes = await prisma.airPlane.findMany();
            return returnedAirPlanes;
        } catch (error) {
            console.error("Error finding airplanes:", error);
            throw error;
        }
    }

    static async delete(planeId: string){
        try {
            await prisma.airPlane.delete({
                where: {
                    id: planeId
                }
            })
            
        } catch (error) {
            if(error){
                throw new Error("Server error")
            }
        }
    }

    private async generateSeat() {
        const createdSeat = await prisma.planeSeat.create({
            data: {
                airPlaneId: this.props.id ?? "",
            }
        })
        const pushedPlaneSeat = new PlaneSeat({
            id: createdSeat.id,
            airPlaneid: createdSeat.airPlaneId
        })
        this.props.seats?.push(pushedPlaneSeat)
    }

    async assignPersonToSeat(person: Passager) {
        if(this.props.seats?.length ?? 0 < this.props.maximunNumberOfPassagers){
            this.generateSeat()
        }
        const indexOfLastchair = this.props.seats? this.props.seats.length - 1 : 0
        
        await prisma.planeSeat.update({
            data: {
                passagerId: person.props.id
            },
            where: {
                airPlaneId: this.props.id,
                id: this.props.seats? this.props.seats[indexOfLastchair].props.id : 0
                
            }
        })
    }
}
