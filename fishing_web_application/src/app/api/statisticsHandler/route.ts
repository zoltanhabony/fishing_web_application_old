import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/options"
import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const data:any = []
            const selectFish = await db.fish.groupBy({
                by: ['fishId', 'fishName'],
                _count: {
                    fishName: true
                  },
                  orderBy:{
                    fishId: 'asc'
                  } 
            })      

            const statbyDate = await db.catch.groupBy({
                by: ['fishId'],
                _count: {
                  fishId: true
                },
                orderBy:{
                    fishId: 'asc'
                }
            })
            let j=0
            let success = false
            for (let i = 0; i < selectFish.length; i++) {
                j=0
                success = false
                while(j < statbyDate.length && !success){
                    if(selectFish[i].fishId === statbyDate[j].fishId){
                        data[i] = {
                            fishName: selectFish[i].fishName,
                            count: statbyDate[j]._count.fishId,
                        }
                        success = true
                    }
                    j++
                }
                if(j === statbyDate.length && !success){
                    data[i] = {
                        fishName: selectFish[i].fishName,
                        count: 0
                    }
                }
              }
            
            return NextResponse.json(
                { data: data},
                { status: 200 }
            )

        }

        if (session.user.role === "USER") {
            
            const user = await db.user.findUnique({
                where:{
                    userName: session.user.userName
                }
            })

            if(!user){
                return NextResponse.json(
                    { data: [], message: "A felhasználó nem létezik!" },
                    { status: 400 }
                )
            }

            const data:any = []
            const selectFish = await db.fish.groupBy({
                by: ['fishId', 'fishName'],
                _count: {
                    fishName: true
                  },
                  orderBy:{
                    fishId: 'asc'
                  } 
            })      

            


            const statbyDate = await db.catch.groupBy({
                where:{
                    logBook:{
                        userId: user.id
                    }
                },

                by: ['fishId'],
                _count: {
                  fishId: true
                },
                orderBy:{
                    fishId: 'asc'
                },
            })
            let j=0
            let success = false
            for (let i = 0; i < selectFish.length; i++) {
                j=0
                success = false
                while(j < statbyDate.length && !success){
                    if(selectFish[i].fishId === statbyDate[j].fishId){
                        data[i] = {
                            fishName: selectFish[i].fishName,
                            count: statbyDate[j]._count.fishId,
                        }
                        success = true
                    }
                    j++
                }
                if(j === statbyDate.length && !success){
                    data[i] = {
                        fishName: selectFish[i].fishName,
                        count: 0
                    }
                }
              }
            
            return NextResponse.json(
                { data: data},
                { status: 200 }
            )
        }

        else{
            return NextResponse.json(
                { data: [], message: "Az adatkérés sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }
    }else {
        return NextResponse.json(
            { data: [], message: "Az adatkérés sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
} 