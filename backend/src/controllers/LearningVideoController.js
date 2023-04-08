import dotenv from "dotenv";
import fs from "fs";
import LearningVideo from "../models/LearningVideo.js";
dotenv.config();

class LearningVideoController {
    async index(req, res) {
        const lv = await LearningVideo.find({});
        return res.status(200).json({lv});
    }

    async store(req, res) {
        try {
            let videoUrl = "";
            if (req.file) {
                videoUrl = req.file.filename;
            }
            return await LearningVideo.create({...req.body, videoUrl: videoUrl}).then((iqs) => {
                return res.status(200).json({success: "Video created successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        let id = req.body.id;
        let type = req.body.type;
        let title = req.body.title;
        let description = req.body.description;
        let findData = await LearningVideo.findById(id);
        let videoUrl = "";
        if (req.file) {
            videoUrl = req.file.filename;
            if (videoUrl) {
                let video = findData.videoUrl ?? "";
                let filePath = process.cwd() + "\\public\\uploads\\video\\" + video;
                if (fs.existsSync(filePath) && video) {
                    console.log("file exist");
                    fs.unlinkSync(filePath);
                    return await LearningVideo.findByIdAndUpdate(id, {
                        type,
                        title,
                        description,
                        videoUrl: videoUrl
                    }).then((banner) => {
                        return res.status(200).json({success: "Video updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                } else {
                    return await LearningVideo.findByIdAndUpdate(id, {
                        type,
                        title,
                        description,
                        image: findData.image
                    }).then((banner) => {
                        return res.status(200).json({success: "Video updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                }
            } else {
                return await LearningVideo.findByIdAndUpdate(id, {
                    type,
                    title,
                    description,
                    videoUrl: findData.videoUrl
                }).then((banner) => {
                    return res.status(200).json({success: "Video updated successfully"});
                }).catch((err) => {
                    return res.json(err);
                });
            }
        } else {
            return await LearningVideo.findByIdAndUpdate(id, {
                type,
                title,
                description,
                videoUrl: findData.videoUrl
            }).then((banner) => {
                return res.status(200).json({success: "Video  updated successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        }

    }

    async show(req, res) {
        let id = req.params.id;
        try {
            let lv = await LearningVideo.findById(id);
            return res.status(200).json({lv});
        } catch (err) {
            return res.json(err);
        }
    }

    async destroy(req, res) {
        let id = req.params.id;
        let findData = await LearningVideo.findById(id);
        if (findData.videoUrl) {
            let video = findData.videoUrl ?? "";
            let filePath = process.cwd() + "\\public\\uploads\\video\\" + video;
            if (fs.existsSync(filePath) && video) {
                fs.unlinkSync(filePath);
                await LearningVideo.findByIdAndDelete(id);
                return res.status(200).json({success: "Video Question deleted successfully"});
            }
            await LearningVideo.findByIdAndDelete(id);
            return res.status(200).json({success: "Video Question deleted successfully"});
        } else {

            try {
                await LearningVideo.findByIdAndDelete(id);
                return res.status(200).json({success: "Video Question deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }

}

export default LearningVideoController;