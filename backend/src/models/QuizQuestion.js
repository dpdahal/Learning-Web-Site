import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MBBS', 'Engineering', 'LokSewa'],
        required: true
    },
    prompt: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    optionA: {
        type: String,
        required: true,
    },
    optionB: {
        type: String,
        required: true,
    },
    optionC: {
        type: String,
        required: true,
    },
    optionD: {
        type: String,
        required: true,
    },
    optionAImage: {
        type: String,
        required: false
    },
    optionBImage: {
        type: String,
        required: false
    },
    optionCImage: {
        type: String,
        required: false
    },
    optionDImage: {
        type: String,
        required: false
    },
    answer: {
        type: [String],
        required: true,
    }
});


QuestionSchema.methods.toJSON = function () {
    const qz = this.toObject();
    if (qz.image) {
        qz.image = process.env.BASE_URL + "/uploads/question/" + qz.image;
    } else {
        qz.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    return qz;
}

export default mongoose.model('Question', QuestionSchema);