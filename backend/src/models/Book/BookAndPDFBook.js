import mongoose from "mongoose";

let BookAndPDFSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookAndPdf",
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


export default mongoose.model("BookAndPDFBook", BookAndPDFSchema);