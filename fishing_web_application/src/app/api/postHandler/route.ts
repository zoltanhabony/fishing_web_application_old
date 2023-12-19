import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { createPostFormSchema, updatePostFormSchema } from "@/data/schema";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const body = await req.json();
            const data = body;
            const {title, description } = createPostFormSchema.parse(data);

            const user = await db.user.findUnique({
                where: {
                    userName: session.user.userName                
                }
            })

            console

           await db.post.create({
            data:{
                userId: user?.id,
                title: title,
                description: description
            }
           })

            return NextResponse.json(
                { message: "A bejegyzés létrehozása sikerült!" },
                { status: 201 }
            );

            
        }
        else{
            return NextResponse.json(
                { authority: null, message: "A létrehozás sikertelen: Nincs megfelelő jogosultság!" },
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

export async function GET(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN" || session.user.role === "USER") {

            const user = await db.user.findUnique({
                where: {userName: session.user.userName}
            })
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
                }
            })

            return NextResponse.json(
                { posts: posts},
                { status: 200 }
            )

        }
        else{
            return NextResponse.json(
                { posts: [], message: "Az adatkérés sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }
    }else {
        return NextResponse.json(
            { posts: [], message: "Az adatkérés sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
} 

export async function PUT(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const body = await req.json();
            console.log(body);
            const data = body;
            const {eventId, title, description } = updatePostFormSchema.parse(data);

           await db.post.update({
            where:{
                postId: eventId
            },
            data:{
                title: title,
                description: description
            }
           })

            return NextResponse.json(
                { message: "A bejegyzés létrehozása sikerült!" },
                { status: 201 }
            );

            
        }
        else{
            return NextResponse.json(
                { posts: [], message: "A létrehozás sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }

    } else {
        return NextResponse.json(
            { posts: [], message: "A létrehozás sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
}


export async function DELETE(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {
            const eventId = req.nextUrl.searchParams.get("eventId")

            await db.post.delete({
                where:{
                    postId: eventId
                }
            })

            return NextResponse.json(
                { message: "Sikeres törlés" },
                { status: 200 }
            )

        }
        else{
            return NextResponse.json(
                { posts: [], message: "Az adatkérés sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }
    }else {
        return NextResponse.json(
            { posts: [], message: "Az adatkérés sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
} 