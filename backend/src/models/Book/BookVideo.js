import mongoose from "mongoose";

let VideoBookSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LearningVideo",
        required: true
    },

    totalPrice: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }

});


export default mongoose.model("BookVideo", VideoBookSchema);