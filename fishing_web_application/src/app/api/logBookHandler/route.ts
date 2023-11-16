import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next"
import { z } from "zod";
import db from "@/lib/db";

const logBookFormSchema = z.object({
    userName: z
      .string()
      .min(3, "A felhasználónév minimum 3 karaktert hosszúságú!"),
    fisheryAuthority: z
      .string()
      .min(5, "Az egyesület neve minimun 5 karakter hosszúságú!"),
    expiresDate: z.date({
      required_error: "Az érvényességi idő kitöltése kötelező!",
    }),
    baseFee: z
      .string()
      .regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat a mező!")
      .min(1, "Az alapdíj kitöltése kötelező!"),
    eszh: z
      .string()
      .regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat a mező!")
      .min(
        1,
        "A mező kitöltése kötelező! Ha a felhasználó mentesül a fizetés alól, akkor 0-értéket írjon be!"
      ),
    currency: z.string().min(3, "A valuta mező kitöltése kötelező!"),
    userFirstName: z.string().min(2, "A vezetéknév megadása kötelező!"),
    userLastName: z.string().min(2, "Az utónév megadása kötelező!"),
    birthDate: z.date({ required_error: "A születési dátum megadása kötelező!" }),
  });

export async function POST(req: any, res: any) {
    const session = await getServerSession(options)
    if (session) {
        if (session.user.role === "ADMIN") {

            const body = await req.json();
            console.log(body);
            const data = {...body, birthDate: new Date(body.birthDate), expiresDate: new Date(body.expiresDate)};
            const { userName, userFirstName, userLastName, birthDate, fisheryAuthority, expiresDate, baseFee, eszh, currency} = logBookFormSchema.parse(data);

            const existingUser = await db.user.findUnique({
                where:{
                    id: userName
                }
            })

            

            const existingFisheryAuthority = await db.fisheryAuthority.findFirst({
                where:{
                    fisheryAuthorityId: fisheryAuthority
                }
            })

            console.log(existingUser?.id)

            const haveLogBook = await db.logBook.findFirst({
                where: {
                    userId : existingUser?.id
                }
            })


            const existingCurrency = await db.currency.findFirst({
                where:{
                   currencyId: currency
                }
            })

            if(!existingUser){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Nincs ilyen regisztrált felhasználó" },
                    { status: 400 }
                )
            }

            if(existingUser.role === "ADMIN"){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Az admin felhasználók nem rendelkezhetnek fogási naplóval!" },
                    { status: 403 }
                )
            }

            if(haveLogBook){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Már rendelkezik naplóval a felhasználó!" },
                    { status: 403 }
                )
            }

            if(birthDate > new Date()){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Hiba a felhasználó születési dátumának megadásánál!" },
                    { status: 400 }
                )
            }

            if(expiresDate < new Date()){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Hiba az érvényesség dátumának megadásánál!" },
                    { status: 400 }
                )
            }

            if(Number.isNaN(baseFee) || Number.isNaN(eszh)){
                return NextResponse.json(
                    { authority: null, message: "Hiba a regisztrációs díjak megadásánál!" },
                    { status: 400 }
                )
            }

            if(!existingFisheryAuthority){
                return NextResponse.json(
                    { authority: null, message: "A létrehozás sikertelen: Nincs ilyen horgász egyesület regisztrálva!" },
                    { status: 400 }
                )
            }

            const newFee = await db.fees.create({
                data: {
                    baseFee : Number(baseFee),
                    eszh: Number(eszh),
                    currencyId : existingCurrency!.currencyId
                }
            })

            
            const newLogBook = await db.logBook.create({
                data: {
                    userId : existingUser.id,
                    fisheryAuthorityId : existingFisheryAuthority.fisheryAuthorityId,
                    expiresDate: expiresDate,
                    feeId: (await newFee).feeId
                }
            })

            await db.user.update({
                where: {
                    id: existingUser.id
                },
                data:{
                    firstName: userFirstName,
                    lastName: userLastName,
                    accessRight: {
                        update:{haveAccessToFishing: true}
                    }
                }
            })
            

            return NextResponse.json(
                { newLogBook, message: "A napló felvétele sikerült!" },
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