import { createTournamentFormSchema, updateTournamentFormSchema } from "@/data/schema";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const body = await req.json();
            const data = {...body, deadline: new Date(body.deadline), startDate: new Date(body.startDate)};
            const { tournamentName, tournamentDescription, deadline, startDate, maxParticipants, tournamentType, fishType } = createTournamentFormSchema.parse(data);

            const newAuthority = await db.tournament.create({
                data: {
                    tournamentName: tournamentName,
                    tournamentDescription: tournamentDescription,
                    deadline: deadline,
                    startDate: startDate,
                    isFinished: false,
                    maxParticipants: Number(maxParticipants),
                    tournamentType: tournamentType,
                    fishType: fishType
                }
            })

            return NextResponse.json(
                { newAuthority, message: "A verseny létrehozása sikerült!" },
                { status: 201 }
            );


        } else {
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

            const tournaments = await db.tournament.findMany({
                select:{
                    tournamentId: true,
                    tournamentName: true,
                    tournamentDescription: true,
                    deadline: true,
                    startDate: true,
                    isFinished: true,
                    fishType: true,
                    maxParticipants:true,
                    tournamentType: true,
                }
            })

            return NextResponse.json(
                { tournaments: tournaments},
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

export async function PUT(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const body = await req.json();
            const data = {...body, deadline: new Date(body.deadline), startDate: new Date(body.startDate)};
            const { tournamentId, tournamentName, tournamentDescription, deadline, startDate, maxParticipants, tournamentType, fishType } = updateTournamentFormSchema.parse(data);

            const newAuthority = await db.tournament.update({
                where:{
                    tournamentId: tournamentId
                },
                data: {
                    tournamentName: tournamentName,
                    tournamentDescription: tournamentDescription,
                    deadline: deadline,
                    startDate: startDate,
                    isFinished: false,
                    maxParticipants: Number(maxParticipants),
                    tournamentType: tournamentType,
                    fishType: fishType
                }
            })

            return NextResponse.json(
                { newAuthority, message: "A verseny módosítása sikerült!" },
                { status: 201 }
            );


        } else {
            return NextResponse.json(
                { authority: null, message: "A módosítás sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }


    } else {
        return NextResponse.json(
            { authority: null, message: "A módosítás sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }

}

export async function DELETE(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {
            const eventId = req.nextUrl.searchParams.get("eventId")

            await db.tournament.delete({
                where:{
                    tournamentId: eventId
                }
            })

            return NextResponse.json(
                { message: "Sikeres törlés" },
                { status: 200 }
            )

        }
        else{
            return NextResponse.json(
                { authority: null, message: "A törlés sikertelen: Nincs megfelelő jogosultság!" },
                { status: 403 }
            )
        }
    }else {
        return NextResponse.json(
            { authority: null, message: "A törlés sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }
} 