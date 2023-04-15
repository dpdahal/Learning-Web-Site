import mongoose from "mongoose";

const QuizAnswerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    },
    answer: [
        {
            type: String,
            required: true
        }
    ],
}, {
    versionKey: false,
});
export default mongoose.model("QuizAnswer", QuizAnswerSchema);