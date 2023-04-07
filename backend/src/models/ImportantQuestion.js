import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MBBS', 'Engineering', 'LokSewa'],
        required: true
    },

    title: {
        type: String,
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
},{
    versionKey: false
});

questionSchema.methods.toJSON = function () {
    const iq = this.toObject();
    if (iq.image) {
        iq.image = process.env.BASE_URL + "/uploads/iq/" + iq.image;
    } else {
        iq.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    return iq;
}


export default mongoose.model('ImportantQuestion', questionSchema);
