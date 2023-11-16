import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/db";
import { compare } from "bcrypt";
import { getJWTAccessToken } from "@/lib/jwt";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jhondoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
          return null
        }
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email
          }
        })

        if(!existingUser){
          return null
        }

        const passwordIsMatch = await compare(credentials.password, existingUser.hashedPassword)

        if(!passwordIsMatch){
          return null
        }

        const {hashedPassword , ...existingUserWithoutPass} = existingUser;
        const accessToken = getJWTAccessToken(existingUserWithoutPass)

        return{
          id:`${existingUser.id}`,
          userName: existingUser.userName,
          email: existingUser.email,
          role: existingUser.role,
          accessToken: accessToken,
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks:{
    async jwt({token, user}){
      return{...token, ...user}
    },

    async session({session, token}){
      session.user = token as any
      return session
    }
  }
};
