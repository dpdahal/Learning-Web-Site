import mongoose from "mongoose";

const QuizAnswerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
    },
    answer: {
        type: String,
        required: true,
    }
});
export default mongoose.model("QuizAnswer", QuizAnswerSchema);