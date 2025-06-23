import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUserIfNoExist } from "../../../lib/dynamoUsers";

const handler = NextAuth({
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
      if (session.user && token.email) {
        session.user.name = token.email;

        // USE:
        // const { data: session } = useSession();
        // console.log(session.user.id); // Now available!
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
