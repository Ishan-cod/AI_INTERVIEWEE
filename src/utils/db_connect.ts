import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully\n");

    // Logging db object
    // console.log({ db });
  } catch (error) {
    console.log("Database connection failed", error);

    process.exit(1);
  }
}

export default dbConnect;
