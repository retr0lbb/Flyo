import {prisma} from "../prisma"


async function clearDb() {
    await prisma.airPlane.deleteMany()


    const [panes, people] = await Promise.all([
        prisma.airPlane.deleteMany(),
        prisma.passager.deleteMany()
    ])


    return [panes, people]
}

console.log(clearDb())