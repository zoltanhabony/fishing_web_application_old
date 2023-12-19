import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { hash } from "bcrypt";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

const userSchema = z.object({
  userName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().min(1, {message:"Email is required"}).email({
    message: "Invalid email",
  }),
  password : z
  .string()
  .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
  .regex(new RegExp(".*[a-z].*"), "One lowercase character")
  .regex(new RegExp(".*\\d.*"), "One number")
  .regex(
    new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
    "One special character"
  )
  .min(8, "Must be at least 8 characters in length"),
  })


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, userName, password} = userSchema.parse(body);

    //Existing email
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exist" },
        { status: 409 }
      );
    }

    //Existing userName
    const existingUserByName = await db.user.findUnique({
      where: { userName: userName },
    });

    if (existingUserByName) {
      return NextResponse.json(
        { user: null, message: "User with this username already exist" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newAccessRight = await db.accessRight.create({
      data:{
        haveAccessToPost: true,   
        haveAccessToTournament: true,
        haveAccessToFishing: false, 
      }
    });

    const newUser = await db.user.create({
      data: {
        userName,
        email,
        hashedPassword,
        firstName:null,
        lastName:null,
        birthDay: null,
        accessRightId: newAccessRight.accessRightId,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfuly" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }
}

type user = {
  userId:string
  userName: string,
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(options)
  if (session) {
      if (session.user.role === "ADMIN" || session.user.role === "USER") {

          let user: user[] = [{
            userId: "",
              userName: "",
          }]

         const userName =  request.nextUrl.searchParams.get("userName")

         const users = await db.user.findMany({
          where:{
            userName: {
              startsWith: userName!
            }
          },select:{
            id: true,
            userName:true,
          }
         })

         return NextResponse.json(
          { users: users },
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
    
