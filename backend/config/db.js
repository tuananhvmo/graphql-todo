import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected`.cyan.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.yellow);
    process.exit(1);
  }
};

export default connectDB;
