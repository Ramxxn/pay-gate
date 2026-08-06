import User from "@/models/User"
import connectDB from "./db"
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                
                if (!credentials.email || !credentials.password) {
                    throw new Error("Please fill all the field")
                }
                
                const { email, password } = credentials
                
                try {
                    await connectDB()
                    const user = await User.findOne({ email }).select("+password")

                    if (!user) {
                        throw new Error("User does not exist");
                    }

                    const isValid = await user.comparePassword(password)

                    if (!isValid) {
                        throw new Error("Invalid credentials")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.userName,
                        image: user.avatar,
                    };
                } catch (error) {
                    console.error("Auth error", error)
                    throw error
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
            }
            return session
        },

    },

    pages: {
        signIn: "/sign-in",
        error: "/sign-in"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET
}


