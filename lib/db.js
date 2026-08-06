import mongoose from "mongoose"


const URI = process.env.MONGODB_URI

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    }
}

const connectDB = async () => {

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(URI);
    }

    try {
        cached.conn = await cached.promise
        console.log(`MongoDB Connected: ${cached.conn.connection.host}`)
    } catch (error) {
        console.log(`Database connection Error: ${error.message}`)
        process.exit(1)
    }

    return cached.conn
}


export default connectDB;