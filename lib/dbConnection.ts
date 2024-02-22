import mongoose  from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    
    if(!process.env.MONGODB_URI){
        throw new Error('Missing mongodb uri enviornment variable');
    }
    if(isConnected){
        console.log('Using existing database connection');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;

        console.log('Connected to Database')
    } catch (error: any) {
        throw new Error('Unable to connect to database', error);
    }
}