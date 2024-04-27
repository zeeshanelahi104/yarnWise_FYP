import axios from "axios";
import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log("jwt callbacks", {token,user, session})
      if(trigger === "update" && session.permissions){
        token.permssions = session.permissions
      }
      if (user) {

        // // Store the user ID in the token
        // token.id = user.id as string;
        
        // token.role = user.role;
        // console.log("user.permissions",user.permissions)
        // if (user.permissions) {
        //   token.permissions = user.permissions;
        // }
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
      console.log("Session Callbacks", {token,user, session})
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
          // console.log("Response Data:", response.data);
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
