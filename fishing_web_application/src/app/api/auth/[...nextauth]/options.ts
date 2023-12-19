import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/db";
import { compare } from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email
          }
        })

        if (!existingUser) {
          return null
        }

        const passwordIsMatch = await compare(credentials.password, existingUser.hashedPassword)

        if (!passwordIsMatch) {
          return null
        }

        const { hashedPassword, ...existingUserWithoutPass } = existingUser;
        
        return {
          id: `${existingUser.id}`,
          userName: existingUser.userName,
          email: existingUser.email,
          role: existingUser.role
        }
      },
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

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.user = token as any
      return session
    }
  }
};
