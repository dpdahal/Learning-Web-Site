import mongoose from "mongoose";

const bookAndPdfSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MBBS', 'Engineering', 'LokSewa'],
        required: true
    },

    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

bookAndPdfSchema.methods.toJSON = function () {
    const bp = this.toObject();
    if (bp.image) {
        bp.image = process.env.BASE_URL + "/uploads/book/" + bp.image;
    } else {
        bp.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    return bp;
}


export default mongoose.model('BookAndPdf', bookAndPdfSchema);
