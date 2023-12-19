import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next"
import { z } from "zod";
import db from "@/lib/db";
import { updateAuthorityFormSchema } from "@/data/schema";

const authorityFormSchema = z.object({
    fisheryAuthorityName: z.string().min(5, "Az egyesület nevének minimun 5 karakter kell tartalmazzon"),
    taxId: z.string().regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat").min(11, "A mezőnek 11 számot kell tartalmaznia").max(12),
    cityName: z.string().min(3),
    streetName: z.string().min(1),
    streetNumber: z.string(),
    floor: z.string().optional(),
    door: z.string().optional(),
});

export async function POST(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const body = await req.json();
            console.log(body);
            const { fisheryAuthorityName, taxId, streetName, streetNumber, floor, door, cityName } = authorityFormSchema.parse(body);

            const existingAuthorityName = await db.fisheryAuthority.findFirst({
                where: { fisheryAuthorityName: fisheryAuthorityName },
            });

            if (existingAuthorityName) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Már létezik ezzel a névvel egysület!" },
                    { status: 409 }
                )
            }

            const existingTaxId = await db.fisheryAuthority.findUnique({
                where: { taxId: String(taxId) },
            });

            if (existingTaxId) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Már létezik ezzel az adószámmal rendelkező egyesület!" },
                    { status: 409 }
                )
            }

            const getCityId = await db.city.findFirst({
                where: {
                    cityId: cityName,
                },
            })


            if (!getCityId) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: A megadott irányítószámhoz nem tartozik város" },
                    { status: 400 }
                )
            }

            const existingAddress = await db.fisheryAuthority.findFirst({
                where: {
                    streetName: streetName, streetNumber: Number(streetNumber), floor: Number(floor) ? Number(floor) : null, door: Number(door), city: {
                        cityName: cityName
                    }
                },
            });

            if (existingAddress) {
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Már létezik ezzel a címmel bejelentett egyesület!" },
                    { status: 409 }
                )
            }

            const newAuthority = await db.fisheryAuthority.create({
                data: {
                    fisheryAuthorityName, taxId, streetName, streetNumber: Number(streetNumber), floor: Number(floor) ? Number(floor): undefined, door: Number(door) ? Number(door) : undefined, cityId: String(getCityId.cityId)
                }
            })

            return NextResponse.json(
                { newAuthority, message: "Az egyesület felvétele sikerült!" },
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

type authority = {
    fisheryAuthorityId : string,
    fisheryAuthorityName: string
}


export async function GET(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN" || session.user.role === "USER") {
  
            let user: authority[] = [{
              fisheryAuthorityId: "",
                fisheryAuthorityName: "",
            }]
  
           const authorityName =  request.nextUrl.searchParams.get("authorityName")
  
           const authorities = await db.fisheryAuthority.findMany({
            where:{
              fisheryAuthorityName: {
                startsWith: authorityName!
              }
            },select:{
              fisheryAuthorityId: true,
              fisheryAuthorityName:true,
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


  export async function PUT(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const body = await req.json();
            console.log(body);
            const { fisheryAuthorityId, fisheryAuthorityName, taxId, streetName, streetNumber, floor, door, cityName } = updateAuthorityFormSchema.parse(body);

            const existingAuthority = await db.fisheryAuthority.findFirst({
                where: { fisheryAuthorityId: fisheryAuthorityId },
            });

            console.log(existingAuthority)


            const getCityId = await db.city.findFirst({
                where: {
                    cityId: cityName,
                },
            })


            if (getCityId && (cityName !== "" || cityName !== null)) {
                return NextResponse.json(
                    { authority: null, message: "A módosítás sikertelen: A megadott irányítószámhoz nem tartozik város" },
                    { status: 400 }
                )
            }

            const existingAddress = await db.fisheryAuthority.findFirst({
                where: {
                    streetName: streetName, streetNumber: Number(streetNumber), floor: Number(floor) ? Number(floor) : null, door: Number(door), city: {
                        cityName: cityName
                    }
                },
            });

            if (existingAddress) {
                return NextResponse.json(
                    { authority: null, message: "A módosítás sikertelen: Már létezik ezzel a címmel bejelentett egyesület!" },
                    { status: 409 }
                )
            }

            await db.fisheryAuthority.update({
                where: {
                    fisheryAuthorityId: fisheryAuthorityId,
                  },
                data: {
                    fisheryAuthorityName: fisheryAuthorityName === "" || fisheryAuthorityName === null ? existingAuthority!.fisheryAuthorityName : fisheryAuthorityName,
                    taxId: taxId === "" || taxId === null ? existingAuthority!.taxId : taxId, 
                    streetName: streetName === "" || streetName === null ? existingAuthority!.streetName : streetName,
                    streetNumber: streetNumber === "" || streetNumber === null ? existingAuthority!.streetNumber : Number(streetNumber),
                    floor: floor === undefined  || streetNumber === null ? existingAuthority!.floor : Number(floor),
                    door: door === undefined || door === null ? existingAuthority!.door : Number(door),
                    cityId: cityName === "" || cityName === null ? existingAuthority!.cityId : cityName
                }
            })

            return NextResponse.json(
                { message: "Az egyesület módosítása sikerült!" },
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
            { authority: null, message: "A létrehozás sikertelen: Nincs érvényes munkamenet!" },
            { status: 401 }
        )
    }

}

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {
            const fisheryAuthorityId = request.nextUrl.searchParams.get("fisheryAuthorityId")

            
            await db.fisheryAuthority.delete(
                { where: {
                    fisheryAuthorityId: fisheryAuthorityId ? fisheryAuthorityId : ""
                }}
            )

            return NextResponse.json(
                { message: "A törlés sikeresen megtörtént" },
                { status: 200 }
            )


        } else {
            return NextResponse.json(
                { message: "Nincs jogosultsága a fogás törléséhez" },
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