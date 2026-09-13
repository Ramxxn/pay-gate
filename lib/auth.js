import User from "@/models/User"
import connectDB from "./db"
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
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
                        userName: user.userName,
                    };
                } catch (error) {
                    console.error("Auth error", error)
                    throw error
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Handle GitHub OAuth: find or create a DB user and attach the DB id
            if (account?.provider === "github") {
                try {
                    await connectDB()
                    let dbUser = await User.findOne({ email: user.email })

                    if (!dbUser) {
                        // Derive a unique userName from the GitHub login
                        const baseUserName = (profile?.login || user.email.split("@")[0]).slice(0, 50)
                        let userName = baseUserName
                        let suffix = 1
                        while (await User.findOne({ userName })) {
                            userName = `${baseUserName}${suffix++}`
                        }

                        dbUser = await User.create({
                            userName,
                            email: user.email,
                            // GitHub users have no password — set a random unguessable one
                            password: Math.random().toString(36) + Math.random().toString(36),
                        })
                    }

                    // Attach DB id so jwt callback can use it
                    user.id = dbUser._id.toString()
                    user.userName = dbUser.userName
                } catch (error) {
                    console.error("GitHub signIn error:", error)
                    return false
                }
            }
            return true
        },

        async jwt({ token, user }) {
            // On initial sign-in, seed the token with the DB id
            if (user) {
                token.id = user.id
                token.userName = user.userName
            }

            // Always refresh avatar (and userName) from DB so uploads are
            // reflected without requiring the user to sign out and back in
            if (token.id) {
                try {
                    await connectDB()
                    const dbUser = await User.findById(token.id).select("userName avatar")
                    if (dbUser) {
                        token.userName = dbUser.userName
                        token.avatar = dbUser.avatar
                    }
                } catch (error) {
                    console.error("JWT DB refresh error:", error)
                }
            }

            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.userName = token.userName
                session.user.avatar = token.avatar
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


