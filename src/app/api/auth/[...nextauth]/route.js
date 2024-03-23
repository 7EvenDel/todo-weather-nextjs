import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";

const users = [
  { name: "admin name", email: "admin@gmail.com", password: "admin" },
  { name: "admin name", email: "admin@gmail.com1", password: "admin1" },
  { name: "admin name", email: "admin@gmail.com2", password: "admin2" },
  { name: "admin name", email: "admin@gmail.com3", password: "admin3" },
];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = users.find(
          (user) => user.email === credentials.email
        );

        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;
          return userWithoutPass;
        }

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
