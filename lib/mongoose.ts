import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDb(){
  mongoose.set('strictQuery', true);

  if(isConnected) return console.log(`Already connected to database`);
  if(!process.env.MONGODB_URL) return console.log(`MONGODB_URL not found`);

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;

    console.log("Connected to database ✅");

  } catch (error) {
    console.log(error);
  }
}