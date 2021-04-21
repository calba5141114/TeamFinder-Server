const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},
  { timestamps: true, toJSON: { virtuals: true } });


// UserSchema.pre('save', async function () {
//   try {
//     //const hash = <hash-goes-here>
//     this.password = hash;
//   } catch (error) {
//     console.error(error);
//   }
// });

module.exports = mongoose.model("user", UserSchema);
