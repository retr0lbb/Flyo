import { PlaneSeat } from "./plane-seat.class";
import { Passager } from "./passager";
import { prisma } from "../lib/prisma";
import { generateId } from "../lib/utils/generate-small-id";

export interface AirPlaneProps {
    maximunNumberOfPassagers: number;
    destiny: any;
    model: string;
    seats?: any[];
    id: string
}

export class AirPlane {

    private props: AirPlaneProps;

    constructor(props: AirPlaneProps) {
        this.props = {
            ...props,
            seats: props.seats || [],
        };
    }

    get seats(): any[] {
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
                airPlaneId: this.props.id,
            }
        })
        this.props.seats?.push(createdSeat)
    }

    async assignPersonToSeat(seat: PlaneSeat, person: Passager) {
        this.generateSeat()

        return this.props.seats
    }
}
