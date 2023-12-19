import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

import db from "@/lib/db"
import { options } from "../../auth/[...nextauth]/options"

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {

        const user = await db.user.findUnique({
            where:{
                userName: session.user.userName
            }
        })
        
        if(!user){
            return NextResponse.json(
                { message: "Nincs ilyen felhasználó" },
                { status: 400}
            )
        }

        if (session.user.role === "ADMIN") {   
            const getAllCatchDataById = await db.catch.findMany({
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
                            fishName:true,
                            fishImageUrl:true
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
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 5,
                  
            })
            return NextResponse.json(
                { catchData: getAllCatchDataById },
                { status: 200 }
            )      
        } 
        
        
        else if (session.user.role === "USER") {   
            const getAllCatchDataById = await db.catch.findMany({
                where:{
                    logBook:{
                        userId: user.id
                    }
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
                            fishName:true,
                            fishImageUrl:true
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
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 5,
                  
            })    
        
            return NextResponse.json(
                { catchData: getAllCatchDataById },
                { status: 200 }
            )   
        
        }   
            else {
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