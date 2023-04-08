import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
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
    videoUrl: {
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

videoSchema.methods.toJSON = function () {
    const lv = this.toObject();
    if (lv.videoUrl) {
        lv.image = process.env.BASE_URL + "/uploads/video/" + lv.videoUrl;
    } else {
        lv.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    return lv;
}


export default mongoose.model('LearningVideo', videoSchema);
