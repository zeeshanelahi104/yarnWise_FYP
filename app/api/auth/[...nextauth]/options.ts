import axios from "axios";
import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if(trigger === "update" && session.permissions){
        token.permssions = session.permissions
      }
      if (user) {
        return{
          ...token,
          id: user.id,
          role: user.role,
          permissions: user.permissions,
        }
      }
      //Update the user in database
      
      return token;
    },

    async session({ session, token, user }) {
      return{
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          permissions: token.permissions
        }
      }
      // if (session?.user) {
      //   // Retrieve the user ID from the token
      //   // session.user.id = token.id as string; 
      //   // session.user.role = token.role;
      //   // session.user.permissions = token.permissions;
      // }
        return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const url = "http://localhost:3000/api/getUserRole";
          let postData = {
            email: credentials?.email,
          };
          const response = await axios.post(url, postData);
          const user = response.data.data[0];

          if (
            credentials?.email === user.email &&
            credentials?.password === user.password
          ) {
            // Pass the user ID along with other user data
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
