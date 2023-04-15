import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
        type: {
            type: String,
            enum: ['MBBS', 'Engineering', 'LokSewa'],
            required: true
        },
        question: {
            type: String,
            required: false,
        },
        image: {
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
        answer: [
            {
                type: String,
                required: true
            }
        ],

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
        }
    },
    {
        versionKey: false,
    });


QuestionSchema.methods.toJSON = function () {
    const qz = this.toObject();
    if (qz.image) {
        qz.image = process.env.BASE_URL + "/uploads/question/" + qz.image;
    } else {
        qz.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    if (qz.optionAImage) {
        qz.optionAImage = process.env.BASE_URL + "/uploads/question/" + qz.optionAImage;
    } else {
        qz.optionAImage = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    if (qz.optionBImage) {
        qz.optionBImage = process.env.BASE_URL + "/uploads/question/" + qz.optionBImage;
    } else {
        qz.optionBImage = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    if (qz.optionCImage) {
        qz.optionCImage = process.env.BASE_URL + "/uploads/question/" + qz.optionCImage;
    } else {
        qz.optionCImage = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    if (qz.optionDImage) {
        qz.optionDImage = process.env.BASE_URL + "/uploads/question/" + qz.optionDImage;
    } else {
        qz.optionDImage = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    return qz;
}

export default mongoose.model('Question', QuestionSchema);