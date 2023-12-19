import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/options"
import db from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER" || session.user.role === "ADMIN") {
            const catchId = request.nextUrl.searchParams.get("catchId")
            console.log(catchId)
            const getAllCatchDataById = await db.catch.findUnique({
                where:{
                    catchId: String(catchId) 
                },
                select: {
                    catchId:true,
                    waterArea:{
                        select:{
                            waterAreaCode:true,
                            waterAreaName:true
                        },
                    },
                    fish:{
                        select:{
                            fishName:true
                        }
                    },
                    createdAt:true,
                    weight:true,
                    weightUnit:true,
                    length:true,
                    lengthUnit:true,
                    isInjured:true,
                    method:true,
                    fishingBait:true,
                    temperature:true,
                    temperatureUnit:true,
                }
            })

            return NextResponse.json(
                { catchData: getAllCatchDataById },
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



export async function DELETE(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER" || session.user.role === "ADMIN") {
            const catchId = request.nextUrl.searchParams.get("catchId")
            console.log(catchId)

            
            const getAllCatchDataById = await db.catch.delete(
                { where: {
                    catchId: catchId ? catchId : ""
                }}
            )

            return NextResponse.json(
                { message: "A törlés sikeresen megtörtént" },
                { status: 200 }
            )


        } else {
            return NextResponse.json(
                { message: "Nincs jogosultsága a fogás törléséhez" },
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