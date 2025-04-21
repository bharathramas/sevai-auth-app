
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const handler = NextAuth({
  providers: [
    CognitoProvider({
      clientId: "7pdpfpeihu4n07kmj0mb2lumsk",
      clientSecret: process.env.CLIENT_SECRET,
      issuer: "https://us-east-1ll2tksjqy.auth.us-east-1.amazoncognito.com",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
