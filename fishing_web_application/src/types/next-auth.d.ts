import NextAuth from "next-auth/next";

declare module 'next-auth'{
  interface Session{
    user:{
      userName: string
      email: string
      role: string
      accessToken: string
      refreshToken: string
    }
  }
}