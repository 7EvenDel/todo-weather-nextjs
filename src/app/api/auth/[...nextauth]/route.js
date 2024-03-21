import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (!profile?.email) {
//         throw new Error("No profile");
//       }

//       await prisma.user.upsert({
//         where: { email: profile.email },
//         create: { email: profile.email, name: profile.name },
//         update: { name: profile.name },
//       });
//       return true;
//     },
//   },
// };

const handler = NextAuth({
  providers: [
    GoogleProvider({
      //   clientId: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId:
        "159123240315-u2m9r3lgcdncaohhhbebb87bmp4ltmps.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});

export { handler as GET, handler as POST };
