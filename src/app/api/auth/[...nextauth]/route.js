import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
