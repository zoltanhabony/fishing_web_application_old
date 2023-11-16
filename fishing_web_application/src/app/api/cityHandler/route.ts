import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/options"
import db from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const cityName = request.nextUrl.searchParams.get("cityName")

            const cities = await db.city.findMany({
                where: {
                    cityName: {
                        startsWith: cityName!,
                        mode: 'insensitive'
                    }

                },select:{
                    cityId:true,
                    cityName:true,
                    postalCode:true
                }
                
            })

            return NextResponse.json(
                { cities: cities },
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