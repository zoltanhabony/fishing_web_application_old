import { getServerSession } from "next-auth"
import { options } from "../../auth/[...nextauth]/options"
import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN" || session.user.role === "USER") {

            const user = await db.user.findUnique({
                where: {userName: session.user.userName}
            })

            console.log(user)

            if(!user) {
                return NextResponse.json(
                    { posts: [], message: "A felhasználó nem létezik!" },
                    { status: 400 }
                )
            }


            const accessRight = await db.accessRight.findUnique({
                where:{
                    accessRightId: user.accessRightId
                }
            })

            console.log(accessRight?.haveAccessToPost)

            if(accessRight?.haveAccessToPost === false){
                return NextResponse.json(
                    { posts: [], message: "Nincs jogosultságod a bejegyzések megtekintéséhez!" },
                    { status: 403 }
                )
            }

            const posts = await db.post.findMany({
                select:{
                    user:{
                        select:{
                            userName: true
                        }
                    },
                    postId: true,
                    title: true,
                    description: true,
                    updatedAt: true
                },
                orderBy:{
                    createdAt:"desc"
                },
                take:4
            })

            return NextResponse.json(
                { posts: posts},
                { status: 200 }
            )

        }
        else{
            return NextResponse.json(
                { authority: null, message: "Az adatkérés sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }
    }else {
        return NextResponse.json(
            { authority: null, message: "Az adatkérés sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
} 