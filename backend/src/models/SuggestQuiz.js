import mongoose from "mongoose";

const SuggestQuizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        enum: ['MBBS', 'Engineering', 'LokSewa'],
        required: true
    },
    question: {
        type: String,
        required: false,
    },
    optionOne: {
        type: String,
    },
    optionTwo: {
        type: String,
    },
    optionThree: {
        type: String,
    },
    optionFour: {
        type: String,
    },
    answer: {
        type: String,
        required: true
    },

});

export default mongoose.model("SuggestQuiz", SuggestQuizSchema);
