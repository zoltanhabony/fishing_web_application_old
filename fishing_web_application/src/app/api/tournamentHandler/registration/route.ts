import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { participantFormSchema } from "@/data/schema";



export async function POST(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER") {

            const body = await req.json();
            const { eventId } = participantFormSchema.parse(body);

            const user = await db.user.findUnique({
                where:{
                    userName: session.user.userName
                }
            })

            if(!user){
                return NextResponse.json(
                    { message: "Nem létezik a regisztrálni kívánt felhasználó" },
                    { status: 400 }
                );
            }


            const tournament = await db.tournament.findUnique({
                where: {tournamentId: eventId}
            })

            if(!tournament){
                return NextResponse.json(
                    { message: "Nem létező versenyre történt a jelentkezés" },
                    { status: 400 }
                );
            }

            const existingParticipant = await db.participant.findMany({
                where:{
                    userId: user.id,
                    tournamentId: tournament.tournamentId
                }
            })

            console.log(existingParticipant)

            if(existingParticipant.length != 0) {
                return NextResponse.json(
                    { message: "Már jelentkezett a versenyre" },
                    { status: 409 }
                );
            }

            const currentParticipants = db.participant.findMany({where: {
                tournamentId: tournament.tournamentId
            }})

            if((await currentParticipants).length === tournament.maxParticipants){
                return NextResponse.json(
                    { message: "Nincs több hely a jelentkezésre" },
                    { status: 409 }
                );
            }
            

            await db.participant.create({
                data: {
                    userId: user.id,
                    tournamentId: eventId,
                    ranking: 0,
                }
            })

            return NextResponse.json(
                { message: "Sikeres jelentkezés!" },
                { status: 201 }
            );


        } else {
            return NextResponse.json(
                { authority: null, message: "A jelentkezés sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }


    } else {
        return NextResponse.json(
            { authority: null, message: "A jelentkezés sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }

}