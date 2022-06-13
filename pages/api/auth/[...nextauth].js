import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    jwt: {
        encryption: true
    },
    secret: process.env.SECRET_CODE,
    callbacks: {
        async jwt({ token }) {
            token.userRole = "user"
            return token
        },
    }
});