import { connect } from "mongoose"
import mongoose, { Connection } from "mongoose";

const mongo_url=process.env.MONGODB_URI
if(!mongo_url){
    throw new Error("MONGODB_URI is not defined in environment variables")
}
type MongooseCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};
const connectdb=async()=>{
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
      cached.promise=connect(mongo_url!).then((c)=>c.connection)
    }
    try {
     cached.conn=await cached.promise
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        throw error
    }
    return cached.conn
  }
export default connectdb