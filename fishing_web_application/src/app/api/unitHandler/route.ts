import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/options"
import db from "@/lib/db"
import { UnitType } from "@prisma/client"

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER" || session.user.role === "ADMIN") {

            const type =  request.nextUrl.searchParams.get("type")

            let getType; 
            switch (type) {
                case "MASS":
                    getType = UnitType.MASS
                    break;
                case "LENGTH":
                    getType = UnitType.LENGTH
                    break;
                case "TEMPERATURE":
                    getType = UnitType.TEMPERATURE
                    break;
                default:
                    getType = UnitType.MASS
                    break;
            }

           const units = await db.unit.findMany({
            where:{
                unitType:getType ,
            },
            select: {
                unitTypeId:true,
                unitAcronyms:true,
                unitName: true
            }
           })

           return NextResponse.json(
            { units: units },
            { status: 200 }
        )
           

        } else {
            return NextResponse.json(
                { message: "Nincs jogosultsága a horgászat megkezdéséhez" },
                { status: 403 }
            )
        }


    } else {
        return NextResponse.json(
            { authority: null, message: "A létrehozás sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
}
