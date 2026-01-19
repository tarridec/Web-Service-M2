import { connect } from "mongoose";

export async function connectToMongo(uri: string) {
    try {
        await connect(uri);
        console.log(`Connecté à MongoDB`);
    } catch (e: unknown) {
        console.error(`Connect to MongoDB failed`, e);
        process.exit();
    }
}