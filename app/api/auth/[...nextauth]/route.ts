import { signUpOrLoginUser } from '@/lib/neo4j';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Extend the Profile type to include the `picture` field
type ExtendedProfile = {
  name: string;
  email: string;
  picture: string;
};

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
      const extendedProfile = profile as ExtendedProfile; // Assert type to include `picture`

      if (extendedProfile) {
        try {
          // Map profile fields to GoogleProfile type
          const googleProfile: GoogleProfile = {
            username: extendedProfile.name,
            email: extendedProfile.email,
            picture: extendedProfile.picture, // Use the `picture` field
          };

          const result = await signUpOrLoginUser(googleProfile);

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
