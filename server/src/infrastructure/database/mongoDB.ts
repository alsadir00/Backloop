import mongoose from "mongoose";


export async function ConnectMongoDB(): Promise<void>{
    try {

        const mongoURI = process.env.MONGO_URI || "mongodb+srv://alsadirebrahim100_db_user:alsadir00@cluster0.lmjfoha.mongodb.net/backloop";
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
        
        
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}