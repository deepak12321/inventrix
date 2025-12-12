import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const establishConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "DB Connection Successfull. Host:- ",
      establishConnection.connection.host
    );
  } catch (error) {
    console.log(
      "error occurred in index.db.js while connecting to backend :-",
      error
    );
  }
};

export default connectDB;
