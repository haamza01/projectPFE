const mongoose = require("mongoose");
const Usershema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Number: { type: Number },
  adress: { type: String },

  role: {
    type: String,
    enum: ["user", "admin", "pharmacie"],
    default: "user",
  },
});
module.exports = mongoose.model("user", Usershema);
