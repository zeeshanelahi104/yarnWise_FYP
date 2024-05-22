// 'use client'
// import { Session } from 'next-auth';
// import { SessionProvider } from 'next-auth/react'

// interface AuthProviderProps {
//     children: React.ReactNode,
//     session?: Session | null;
// }

// const AuthProvider:React.FC<AuthProviderProps> = ({children, session}) => {
//   return (
//     <SessionProvider session={session}>
//         {children}
//     </SessionProvider>
//   )
// }

// export default AuthProvider

// context/AuthContext.js
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Session } from 'next-auth';
interface AuthContextType {
  user: Session["user"] | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<Session["user"] | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session?.user ?? null);
    } else {
      setUser(null);
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ user, status }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
