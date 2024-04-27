import mongoose from "mongoose";
import  User  from "@/models/user";
import { NextApiResponse } from "next";
export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not defined");
    }

    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "yarnwise",
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    console.log(`Database Connected On ${connection.host}`);
};