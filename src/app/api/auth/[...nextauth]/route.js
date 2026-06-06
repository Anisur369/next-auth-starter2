import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials"
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
      return { id: user._id, email: user.email };
    }
  })
],
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async session({ session, token, user }) {
    if (token) {
      session.role = token.role;
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    console.log(user.role);
    if(user) {
      token.name = user.name;
      token.role = user.role;
    }
    return token
  }
}
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };