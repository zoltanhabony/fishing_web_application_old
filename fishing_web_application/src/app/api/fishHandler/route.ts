import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/options"
import db from "@/lib/db"
import { z } from "zod";

const addCatchFormSchema = z
    .object({
        waterAreaName: z.string().min(1, "A mező kitöltése kötelező"),
        fishType: z.string().min(1, "A mező kitöltése kötelező"),
        weight: z
            .string()
            .regex(new RegExp("^([0-9]+)?[.]?([0-9]+)?$"), "Csak számot tartalmazhat")
            .min(1, "A mező kitöltése kötelező"),
        weightUnit: z.string().min(1, "Kötelező választani a listából"),
        isStored: z.boolean(),
        length: z
            .string()
            .regex(new RegExp("^([0-9]+)?[.]?([0-9]+)?$"), "Csak számot tartalmazhat")
            .optional(),
        lengthUnit: z.string().optional(),
        temperature: z
            .string()
            .regex(new RegExp("^([0-9]+)?[.]?([0-9]+)?$"), "Csak számot tartalmazhat")
            .optional(),
        temperatureUnit: z.string().optional(),
        method: z.string().optional(),
        bait: z.string().optional(),
        isInjured: z.boolean(),
    })
    .refine(
        (data) =>
            (data.length == "" && data.lengthUnit == "") ||
            (data.length != "" && data.lengthUnit != ""),
        {
            message:
                "Ha ez érték vagy a mértékegység meg van adva akkor kötelező kitölteni a párját is!",
            path: ["length"], // path of error
        }
    )
    .refine(
        (data) =>
            (data.temperature == "" && data.temperatureUnit == "") ||
            (data.temperature != "" && data.temperatureUnit != ""),
        {
            message:
                "Ha ez érték vagy a mértékegység meg van adva akkor kötelező kitölteni a párját is!",
            path: ["temperature"], // path of error
        }
    )
    .refine(
        (data) =>
            (data.weight == "" && data.weightUnit == "") ||
            (data.weight != "" && data.weightUnit != ""),
        {
            message:
                "Ha ez érték vagy a mértékegység meg van adva akkor kötelező kitölteni a párját is!",
            path: ["weight"], // path of error
        }
    );

export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER") {

            const fishes = await db.fish.findMany({
                select: {
                    fishName: true,
                    fishId: true
                }
            })

            return NextResponse.json(
                { fishes: fishes },
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

export async function POST(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "USER") {

            const body = await req.json();
            console.log(body);
            const { waterAreaName, fishType, weight, weightUnit, isStored, length, lengthUnit, temperature, temperatureUnit, method, bait, isInjured } = addCatchFormSchema.parse(body);

            const getWaterArea = await db.waterArea.findUnique({
                where: {
                    waterAreaId: waterAreaName!
                },
            })

            const user = await db.user.findFirst({
                where: {
                    userName: session.user.userName
                }
            })

            const getLogBookId = await db.logBook.findFirst({
                where: {
                    userId: user?.id
                },
                select: {
                    serialNumber: true
                }
            })
            const getFishTypeId = await db.fish.findFirst({
                where: {
                    fishId: fishType!
                }
            })

            const getMassUnit = await db.unit.findFirst({
                where: {
                    unitTypeId: weightUnit
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


            if (!getWaterArea) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Nem található a megadott vízterület!" },
                    { status: 404 }
                )
            }

            if (!getLogBookId) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Nem rendelezel fogási naplóval!" },
                    { status: 400 }
                )
            }

            if (!getFishTypeId) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Nem létezik ilyen hal az adatbázisban!" },
                    { status: 400 }
                )
            }

            if(!getMassUnit){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Hiba a súly mértékegységének megadásánál!" },
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

            if (weight != "" && !Number(weight)) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Hiba a súly megadásnál!" },
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

            await db.catch.create({
                data: {
                    logBookId: getLogBookId.serialNumber,
                    waterAreaId: getWaterArea.waterAreaId,
                    fishId: getFishTypeId.fishId,
                    weight: Number(weight),
                    weightUnit: getMassUnit?.unitAcronyms,
                    length: Number(length),
                    lengthUnit: getLengthUnit?.unitAcronyms,
                    isInjured: isInjured,
                    method: method,
                    fishingBait: bait,
                    temperature: Number(temperature),
                    temperatureUnit: getTemperatureUnit?.unitAcronyms,
                    isStored: isStored,
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


