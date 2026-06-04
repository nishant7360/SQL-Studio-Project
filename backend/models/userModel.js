import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  totalQuestionSolved: {
    type: Number,
    default: 0,
  },

  totalQuestionAttempted: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },

      query: {
        type: String,
      },

      isCorrect: {
        type: Boolean,
        default: false,
      },

      attemptedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  resetOtp: { type: String, default: null },
  resetOtpExpiry: { type: Date, default: null },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.checkPassword = function (candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
