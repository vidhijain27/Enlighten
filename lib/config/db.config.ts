import mongoose, { mongo } from "mongoose";

export const ConnectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://vidhi:vidhi@cluster0.ryney0y.mongodb.net/?retryWrites=true&w=majority");
        console.log("DB in connected wtih" + mongoose.connection.host);
    } catch (error) {
        mongoose.disconnect();
        process.exit(1)
    }
}