import logger from "@/utils/logger"
import mongoose from "mongoose"

const connectDb = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("Missing db connection uri")
    }
    if (mongoose.connection.readyState === mongoose.STATES.connected) {
        return
    }
    await mongoose.connect(process.env.MONGO_URI)
    logger.info('> Connected to db: ', process.env.MONGO_URI)
}

export default connectDb