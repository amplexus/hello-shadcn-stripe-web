import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.NEXTAUTH_FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_FACEBOOK_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
})
