import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: string;
      "custom:tenant_id"?: string;
      sub?: string;
    };
  }

  interface User {
    role?: string;
    tenant_id?: string;
  }
}
