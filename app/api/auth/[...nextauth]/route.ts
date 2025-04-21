import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { NextAuthOptions } from "next-auth";

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

interface ExtendedToken {
  role?: string;
  tenant_id?: string;
  email?: string;
  [key: string]: unknown;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_AJNx5w4vE",
    }),
  ],
  callbacks: {
    async jwt({ token, account }): Promise<ExtendedToken> {
      if (account?.id_token) {
        const decoded = parseJwt(account.id_token);
        console.log("🎯 Decoded Cognito JWT:", decoded);

        token.role = decoded["custom:role"] as string;
        token.tenant_id = decoded["custom:tenant_id"] as string;
        token.email = decoded.email as string;
      }
      return token as ExtendedToken;
    },
    async session({
      session,
      token,
    }: {
      session: any;
      token: ExtendedToken;
    }) {
      session.user = {
        ...session.user,
        email: token.email || "",
        role: token.role || "",
        tenant_id: token.tenant_id || "",
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
