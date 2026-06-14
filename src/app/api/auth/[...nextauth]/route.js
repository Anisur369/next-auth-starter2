import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/dbConnect";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
providers: [
  CredentialsProvider({
    name: 'Credentials',

    credentials: {
      email: { label: "Email", type: "email", placeholder: "Enter your email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const { email, password } = credentials;
      const user = await dbConnect("users").findOne({ email });
      if (!user) {
        return null;
      }
      const isPasswordOk = await bcrypt.compare(password, user.password);
      if (!isPasswordOk) {
        return null;
      }
      return user;
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
],
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    const payload = { ...user, email: user.email, provider: account.provider, providerId: account.providerId, role: "user" };
    console.log("Payload:", payload);

    // if(!user?.email) {
    //   return false
    // }
    const existingUser = await dbConnect("users").findOne({ email: user.email });

    if (!existingUser) {
      await dbConnect("users").insertOne(payload);
      return true
    }

    return true
  },
  // async redirect({ url, baseUrl }) {
  //   return baseUrl
  // },
  async session({ session, token, user }) {
    if (token) {
      session.email = token.email;
      session.role = token.role;
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if(user) {
      token.email = user.email;
      token.role = user.role;
    }
    return token
  }
}
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };