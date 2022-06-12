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
        // async jwt(token, account,res) {
        //     console.log(res)
        //     console.log(token)
        //     console.log(account)
        //     console.log(process.env.SECRET_CODE,)
        //     if (account?.accessToken) {
        //         token.accessToken = account.accessToken
        //     }
        //     else {
        //         return token
        //     }
        // },
        redirect: async (url, _baseUrl) => {
            if (url === '/profile') {
                return Promise.resolve('/');

            }
            return Promise.resolve('/');
        }
    }
});