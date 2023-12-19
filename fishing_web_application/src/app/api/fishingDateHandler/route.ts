import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER") {

            const user = await db.user.findFirst({
                where: {
                    userName: session.user.userName
                }
            })

            const date = await db.isFishing.create({
                data: {
                    userId: user!.id,
                    date: new Date()
                }
            })
            return NextResponse.json(
                {
                    fishingDate: true, message: "Siker: A " + date.date + " napon megkezdte a horgászatot!"
                },
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


