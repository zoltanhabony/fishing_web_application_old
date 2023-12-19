import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/options"
import db from "@/lib/db"
import { modifySavedCatchSchema } from "@/data/schema"

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)

    if (session) {
        if (session.user.role === "USER" || session.user.role === "ADMIN") {

            const user = await db.user.findUnique({
                where: {
                    userName: session.user.userName
                }
            })

            if(!user){
                return NextResponse.json(
                    { message: "Nem létezik ilyen nevű felhasználó" },
                    { status: 404 }
                )
            }

            const logBook = await db.logBook.findFirst({
                where: {
                    userId: user.id
                }
            })

            if(!logBook){
                return NextResponse.json(
                    { message: "Nincsen felhasználóhoz tartozó fogási napló!" },
                    { status: 404 }
                )
            }
            
            const savedFishes = await db.catch.findMany({
                where: {
                    logBookId: logBook.serialNumber,
                    isStored: true
                },
                select: {
                    catchId: true,
                    fish: {
                        select: {
                            fishName: true,
                            fishImageUrl:true,
                        },
                    },
                    createdAt: true,
                    weight: true,
                    weightUnit:true,
                    length: true,
                    lengthUnit:true,
                    waterArea: {
                        select: {
                            waterAreaCode: true,
                            waterAreaName: true
                        }
                    }
                }
                
            })
            
            return NextResponse.json(
                { catches: savedFishes },
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

export async function PUT(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER") {

            const body = await req.json();
            console.log(body);
            const {catchId, length, lengthUnit, temperature, temperatureUnit, method, bait} = modifySavedCatchSchema.parse(body);

            const getCatch = await db.catch.findUnique({
                where:{
                    catchId: catchId
                }
            })

            const getTemperatureUnit = await db.unit.findFirst({
                where: {
                    unitTypeId: temperatureUnit
                }
            })
            const getLengthUnit = await db.unit.findFirst({
                where: {
                    unitTypeId: lengthUnit
                }
            })

            if(!getCatch){
                return NextResponse.json(
                    { authority: null, message: "A módosítás sikertelen: Nem létezik fogásazonosító" },
                    { status: 400 }
                )
            }

            if(temperature !== "" && !getTemperatureUnit){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Hiba a hőmérséklet mértékegységének megadásánál!" },
                    { status: 400 }
                )
            }

            if(length !== "" && !getLengthUnit){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Hiba a hossz mértékegységének megadásánál!" },
                    { status: 400 }
                )
            }

            if (length !== "" && !Number(length)) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Hiba a hossz megadásnál!" },
                    { status: 400 }
                )
            }

            if (temperature !== ""  && !Number(temperature)) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Hiba a hőmérséklet megadásnál!" },
                    { status: 400 }
                )
            }

            await db.catch.update({
                where: {
                    catchId: catchId,
                  },
                data: {
                    length: Number(length) === 0 ? getCatch.length : Number(length),
                    lengthUnit: getLengthUnit?.unitAcronyms === " " ? getCatch.lengthUnit : getLengthUnit?.unitAcronyms,
                    method: method === " " ? getCatch.method : method,
                    fishingBait: bait  === " " ? getCatch.fishingBait : bait,
                    temperature: Number(temperature)  === 0 ? getCatch.temperature : Number(temperature) ,
                    temperatureUnit: getTemperatureUnit?.unitAcronyms === " " ? getCatch.temperatureUnit : getTemperatureUnit?.unitAcronyms,
                }
            })

            return NextResponse.json(
                { message: "A létrehozás sikeresen megtörtént!" },
                { status: 200 }
            )



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