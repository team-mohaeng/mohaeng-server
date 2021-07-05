import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  mongoURI: process.env.MONGODB_URI,

  deviceToken: process.env.deviceToken,
  
  /**
   * Your secret sauce
   */
  awsBucket: process.env.AWS_BUCKET,
  awsS3AccessKey: process.env.AWS_ACCESS_KEY,
  awsS3SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};