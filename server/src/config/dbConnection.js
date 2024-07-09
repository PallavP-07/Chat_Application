// O6aFIK2kcuIVP0su
// pallav811

import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION,{dbName:"chat_app"});
    console.log(chalk.bgGreenBright(`MongoDB database connected successfully..... `));
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

export { connectDB };
