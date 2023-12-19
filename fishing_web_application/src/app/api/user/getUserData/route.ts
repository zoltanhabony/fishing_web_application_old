import { getServerSession } from "next-auth/next"
import { options } from "../../auth/[...nextauth]/options"
import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN" || session.user.role === "USER") {
            
            const user = await db.user.findUnique({
                where: {
                    userName: session.user.userName
                },select:{
                    userName: true,
                    email: true,
                    createdAt: true,
                    LogBook:{
                        select:{
                            serialNumber:true
                        }
                    }
                }
            })

            if (!user) {
                return NextResponse.json(
                    { user: null ,message: "Nem létezik felhasználó ezzel a névvel" },
                    { status: 403 }
                )
            }
            
            return NextResponse.json(
                { user: user  },
                { status: 200 }
            )
            
        }
        else {
            return NextResponse.json(
                { users: [], message: "Az adatkérés sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }
    } else {
        return NextResponse.json(
            { users: [], message: "Az adatkérés sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
}

