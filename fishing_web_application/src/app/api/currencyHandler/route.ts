import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/options"
import db from "@/lib/db"



export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN" || session.user.role === "USER") {
  
           const currencies = await db.currency.findMany({
            
           })
           return NextResponse.json(
            { currencies: currencies },
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