import mongoose from "mongoose";

const forgotPasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    token: {
        type: String,
        required: true
    }
});

export default mongoose.model("ForgotPassword", forgotPasswordSchema);