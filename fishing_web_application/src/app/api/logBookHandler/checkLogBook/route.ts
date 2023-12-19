import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/options"
import db from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {
            const userId = request.nextUrl.searchParams.get("userId")
            console.log(userId)
            const user = await db.user.findUnique({
                where: {
                    id: userId!
                }
            })

            if(!user){
                return NextResponse.json(
                    { message: "Nem létezik ilyen nevű felhasználó" },
                    { status: 404 }
                )
            }

            const logBook = await db.logBook.findFirst({
                where: {
                    userId: user.id
                }
            })

            if(!logBook){
                return NextResponse.json(
                    { message: "Nincsen felhasználóhoz tartozó fogási napló!" },
                    { status: 404 }
                )
            }
            
            const savedFishes = await db.catch.findMany({
                where: {
                    logBookId: logBook.serialNumber,
                    isStored: true
                },
                select: {
                    catchId: true,
                    fish: {
                        select: {
                            fishName: true,
                            fishImageUrl: true
                        },
                    },
                    createdAt: true,
                    weight: true,
                    weightUnit:true,
                    length: true,
                    lengthUnit:true,
                    waterArea: {
                        select: {
                            waterAreaCode: true,
                            waterAreaName: true
                        }
                    }
                }
                
            })
            
            return NextResponse.json(
                { catches: savedFishes },
                { status: 200 }
            )

        } else {
            return NextResponse.json(
                { catches:null, message: "Nincs jogosultsága a horgászat megkezdéséhez" },
                { status: 403 }
            )
        }


    } else {
        return NextResponse.json(
            { catches:null, message: "A létrehozás sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
}
