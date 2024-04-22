import { PlaneSeat } from "./plane-seat.class";
import { Passager } from "./passager";
import { prisma } from "../lib/prisma";

export interface AirPlaneProps {
    maximunNumberOfPassagers: number;
    destiny: any;
    model: string;
    seats?: PlaneSeat[];
}

export class AirPlane {

    private props: AirPlaneProps;

    constructor(props: AirPlaneProps) {
        this.props = {
            ...props,
            seats: props.seats || [],
        };
        this.generateSeats();
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
                }
            });
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

    private generateSeats() {
        const numberOfRows = Math.ceil(this.props.maximunNumberOfPassagers / 6);

        for (let index = 1; index <= numberOfRows; index++) {
            const seat = new PlaneSeat({ price: 1000, row: index, seat: "D" });
            this.props.seats?.push(seat);
        }
    }

    assignPersonToSeat(seat: PlaneSeat, person: Passager) {
        if (seat.props.signedPerson != null) {
            throw new Error("This seat is already assigned");
        }

        seat.props.signedPerson = person;
    }
}
