import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/options"
import db from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {
  
  
           const authorities = await db.fisheryAuthority.findMany({
           select:{
              fisheryAuthorityId: true,
              fisheryAuthorityName:true,
              city:{
                select:{
                    postalCode:true,
                    cityName: true
                }
              },
              streetName:true,
              streetNumber:true,
              taxId:true,
              floor:true,
              door:true,
              _count: {
                select:{
                    LogBook:{}
                }
              }
            }
           })
  
           return NextResponse.json(
            { authorities: authorities },
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
