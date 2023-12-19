import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/options"
import db from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {
            
            const allCatches = await db.catch.findMany({
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
                { catches: allCatches },
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
            { catches:null, message: "Az adatok kérése sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
}
