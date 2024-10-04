import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDB = async () => {
    const DB_URI = process.env.DB_URI as string
    try {
        await mongoose.connect(DB_URI).then(() => {
            console.log("DB connected")
        })
    } catch (error) {
        console.log(`Couldn't connect to DB ${error}`)
        process.exit(1)
    }
}
export default connectDB