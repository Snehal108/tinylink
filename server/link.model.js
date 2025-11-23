
const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  targetUrl: { type: String, required: true },
  totalClicks: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models?.Link || mongoose.model("Link", LinkSchema);
