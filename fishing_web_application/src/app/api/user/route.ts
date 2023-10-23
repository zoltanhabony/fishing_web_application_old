import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  userName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().min(1, {message:"Email is required"}).email({
    message: "Invalid email",
  }),
  firstName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  
  lastName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
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
    const { email, userName, password, firstName, lastName } = userSchema.parse(body);

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
    const newUser = await db.user.create({
      data: {
        userName,
        email,
        hashedPassword,
        firstName,
        lastName,
      },
    });
    return NextResponse.json(
      { user: newUser, message: "User created successfuly" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
