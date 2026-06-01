import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    nik?: string;
    emailVerified?: boolean;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      nik?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    nik?: string;
  }
}
