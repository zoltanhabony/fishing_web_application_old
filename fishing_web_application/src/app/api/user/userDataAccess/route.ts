import { getServerSession } from "next-auth/next"
import { options } from "../../auth/[...nextauth]/options"
import db from "@/lib/db"
import { NextResponse } from "next/server"
import { updateUserByAdminFormSchema } from "@/data/schema"

export async function GET(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const users = await db.user.findMany({
                where: {
                    role: "USER"
                },
                select: {
                    id: true,
                    userName: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    LogBook: {
                        select: {
                            serialNumber: true,
                            expiresDate: true,
                        }
                    },
                    accessRight: {
                        select: {
                            haveAccessToFishing: true,
                            haveAccessToPost: true,
                            haveAccessToTournament: true,
                        }
                    }
                }
            })


            return NextResponse.json(
                { users: users },
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


export async function PUT(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {
            const body = await req.json();
            const data = {...body, expiresDate: new Date(body.expiresDate)};
            
            const { 
                userId,
                userName,
                email,
                firstName,
                lastName,
                expiresDate,
                haveAccessToPost,
                haveAccessToTournament,
                haveAccessToFishing,
            } = updateUserByAdminFormSchema.parse(data);
            
            const user = await db.user.findUnique({
                where: {
                    id: userId
                }, 
            })

            if(!user){
                return NextResponse.json(
                    { message: "A módosítás sikertelen: Nem létezik a módosítandó felhasználó" },
                    { status: 409 }
                )
            }

            const existingUserName = await db.user.findMany({
                where: {
                    NOT:{
                        id: userId
                    },
                    userName: userName
                }
            })

            

            if(existingUserName.length !== 0){
                return NextResponse.json(
                    { message: "A módosítás sikertelen: Már rendelkezik felhasználó ezzel a névvel" },
                    { status: 409 }
                )
            }


            const existingEmail= await db.user.findMany({
                where: {
                    NOT:{
                        id: userId
                    },
                    email: email
                }
            })

            

            if(existingEmail.length !== 0){
                return NextResponse.json(
                    { message: "A módosítás sikertelen: Már rendelkezik felhasználó ezzel az e-mail címmel" },
                    { status: 409 }
                )
            }

            await db.user.update({
                where: {
                    id: userId
                },
                data:{
                    userName: userName,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                }
            })

            await db.logBook.update({
                where: {
                    userId: userId
                },
                data:{
                    expiresDate: expiresDate
                }
            })

            await db.accessRight.update({
                where: {
                    accessRightId : user.accessRightId
                },
                data:{
                    haveAccessToFishing: haveAccessToFishing,
                    haveAccessToPost: haveAccessToPost,
                    haveAccessToTournament: haveAccessToTournament
                }
            })
                


            return NextResponse.json(
                {  message: "Sikeres adatmódosítás"},
                { status: 200 }
            )

        }
        else {
            return NextResponse.json(
                { users: [], message: "A módosítás sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }
    } else {
        return NextResponse.json(
            { users: [], message: "A módosítás sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
} 