import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

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
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const client = new MongoClient(
          "mongodb+srv://arturrmartunovskyi:R7tF3vEopPt5H4b2@todo-weather.y95b0t6.mongodb.net/"
        );
        await client.connect();
        const currentUser = await client
          .db("todo-weather")
          .collection("users")
          .find({ email: credentials.email, password: credentials.password })
          .toArray();
        await client.close();

        if (currentUser.length > 0) {
          const { password, _id, ...userWithoutPassAndId } = currentUser[0];
          return userWithoutPassAndId;
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/auth" },
});

export { handler as GET, handler as POST };
