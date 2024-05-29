// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      permissions: Record<string, string[]>;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    permissions: Record<string, string[]>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    permissions: Record<string, string[]>;
  }
}
