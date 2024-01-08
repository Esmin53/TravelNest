import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";


export const authOptions: NextAuthOptions = {
    //@ts-expect-error
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: {
              timeout: 40000,
            },
        })
    ],
    pages: {
        signIn: '/sign-in'
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.picture
          }
          return Promise.resolve(session);
        },
        jwt: async ({ user, token }) => {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            })

            if (!dbUser) {
                token.id = user!.id
                return token
              }

          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image
          }
        },
      },
}