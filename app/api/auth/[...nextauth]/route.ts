import { signUpOrLoginUser } from '@/lib/neo4j';
import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      const gogProfile = profile as GoogleProfile; // Assert type to include `picture`

      if (gogProfile) {
        try {
          const result = await signUpOrLoginUser(gogProfile);
          console.log(result)

          return true; // Allow sign-in
        } catch (error) {
          console.error('Error during signIn:', error);
          return false; // Reject sign-in on error
        }
      }
      return false; // Reject if no profile is provided
    },
  },

});

export { handler as GET, handler as POST };
