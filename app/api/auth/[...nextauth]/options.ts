import axios from "axios";
import { getServerSession } from "next-auth/next";
// @ts-ignore
import {type NextAuthOptions}  from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session.permissions) {
        token.permissions = session.permissions;
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          permissions: user.permissions,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          permissions: token.permissions,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const url = "http://localhost:3000/api/getUserRole";
          const postData = { email: credentials?.email };
          const response = await axios.post(url, postData);
          const user = response.data.data[0];

          if (
            credentials?.email === user.email &&
            credentials?.password === user.password
          ) {
            return { ...user, id: user.id };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error:", error);
          return null;
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
