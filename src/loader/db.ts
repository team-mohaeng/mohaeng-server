import mongoose from "mongoose";
import config from "../config";
import User from "../models/User";
import Course from "../models/Course";
import SmallSatisfaction from "../models/SmallSatisfaction";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Connected ...");

    User.createCollection().then(function(collection) {
      console.log('User Collection is created!');
    });
    Course.createCollection().then(function(collection) {
      console.log('Course Collection is created!');
    });
    SmallSatisfaction.createCollection().then(function(collection) {
      console.log('Course Collection is created!');
    });

    
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
