import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/options"
import db from "@/lib/db"

type area = {
    waterAreaId: string,
    waterAreaName:  string,
  }

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER") {

            let waterArea: area[] = [{
                waterAreaId: "",
                waterAreaName:""
            }]

           const name =  request.nextUrl.searchParams.get("name")

           if(name === ""){
            return NextResponse.json(
                { areas: waterArea },
                { status: 200 })
           }

           waterArea = await db.waterArea.findMany({
            where: {
                waterAreaName: {
                    contains: name!,
                    mode: 'insensitive'
                }
            },
            select: {
                waterAreaId: true,
                waterAreaName:true,
            }
           })

           console.log(waterArea + "valami")
           
           return NextResponse.json(
            { areas: waterArea },
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