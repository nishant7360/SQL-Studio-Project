import mongoose from "mongoose";

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
});

export default mongoose.model("User", userSchema);
