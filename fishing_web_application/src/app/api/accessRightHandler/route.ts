import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER" || session.user.role === "ADMIN") {

            const user = await db.user.findFirst({
                where: {
                    userName: session.user.userName
                }
            })

            const accessRight = await db.accessRight.findFirst({
                where: {
                    accessRightId: user?.accessRightId
                }
            })

            const haveLogBook = await db.logBook.findFirst({
                where: {
                    userId: user?.id
                }
            })

            const fishingDate = await db.isFishing.findFirst({
                where: {
                    userId: user?.id,
                    date: new (Date)
                }
            })

            return NextResponse.json(
                {
                    haveAccessToFishing: Boolean(accessRight?.haveAccessToFishing),
                    haveLogBook: Boolean(haveLogBook),
                    isFishing: Boolean(fishingDate)
                },
                { status: 200 }
            )


        } else {
            return NextResponse.json(
                { authority: null, message: "Nincs jogosultsága az adatok megtekintéséhez" },
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