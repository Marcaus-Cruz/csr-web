import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUserIfNoExist, getUserById } from "../../../lib/dynamoUsers";
import { Hitlist } from "../../../types/hitlist.types";

export type CSRUser = Session["user"] & {
  id: string;
  email: string;
  hitlist?: Hitlist;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        console.log("Google user:", user);

        if (!user?.id || !user?.email) {
          console.error("Missing user.id or user.email:", user);
          return false;
        }

        await createUserIfNoExist({
          id: user.id,
          email: user.email,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          hitlist: [],
        });

        return true;
      } catch (err) {
        console.error("SIGN IN ERROR:", err);
        return false; // trigger error
      }
    },

    async session({ session, token }) {
      if (session.user && token.email && token.sub) {
        const dynamoUser = await getUserById(token.sub);

        session.user = {
          ...session.user,
          id: token.sub,
          name: token.name,
          email: token.email,
          hitlist: dynamoUser?.hitlist,
        } as CSRUser;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
