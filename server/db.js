
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🔥 MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
  }
};

module.exports = connectDB;
