import dotenv from "dotenv";
import fs from "fs";
import ImportantQuestion from "../models/ImportantQuestion.js";

dotenv.config();

class ImportantQuestionController {
    async index(req, res) {
        const iq = await ImportantQuestion.find({});
        return res.status(200).json({iq});
    }

    async store(req, res) {
        try {
            let imageName = "";
            if (req.file) {
                imageName = req.file.filename;
            }
            return await ImportantQuestion.create({...req.body, image: imageName}).then((iqs) => {
                return res.status(200).json({success: "Question created successfully"});
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
        let findData = await ImportantQuestion.findById(id);
        let imageName = "";
        if (req.file) {
            imageName = req.file.filename;
            if (imageName) {
                let image = findData.image ?? "";
                let filePath = process.cwd() + "\\public\\uploads\\iq\\" + image;
                if (fs.existsSync(filePath) && image) {
                    console.log("file exist");
                    fs.unlinkSync(filePath);
                    return await ImportantQuestion.findByIdAndUpdate(id, {
                        type,
                        title,
                        description,
                        image: imageName
                    }).then((banner) => {
                        return res.status(200).json({success: "Question updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                } else {
                    return await ImportantQuestion.findByIdAndUpdate(id, {
                        type,
                        title,
                        description,
                        image: findData.image
                    }).then((banner) => {
                        return res.status(200).json({success: "Question updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                }
            } else {
                return await ImportantQuestion.findByIdAndUpdate(id, {
                    type,
                    title,
                    description,
                    image: findData.image
                }).then((banner) => {
                    return res.status(200).json({success: "Question updated successfully"});
                }).catch((err) => {
                    return res.json(err);
                });
            }
        } else {
            return await ImportantQuestion.findByIdAndUpdate(id, {
                type,
                title,
                description,
                image: findData.image
            }).then((banner) => {
                return res.status(200).json({success: "Important Question updated successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        }

    }

    async show(req, res) {
        let id = req.params.id;
        try {
            let iq = await ImportantQuestion.findById(id);
            return res.status(200).json({iq});
        } catch (err) {
            return res.json(err);
        }
    }

    async destroy(req, res) {
        let id = req.params.id;
        let findData = await ImportantQuestion.findById(id);
        if (findData.image) {
            let image = findData.image ?? "";
            let filePath = process.cwd() + "\\public\\uploads\\iq\\" + image;
            if (fs.existsSync(filePath) && image) {
                fs.unlinkSync(filePath);
                await ImportantQuestion.findByIdAndDelete(id);
                return res.status(200).json({success: "Important Question deleted successfully"});
            }
            await ImportantQuestion.findByIdAndDelete(id);
            return res.status(200).json({success: "Important Question deleted successfully"});
        } else {

            try {
                await ImportantQuestion.findByIdAndDelete(id);
                return res.status(200).json({success: "Important Question deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }

    async showImportantQuestionForUser(req, res) {
        try {
            let type = req.params.type;
            let iq = await ImportantQuestion.find({type: type});
            return res.status(200).json({iq: iq});
        } catch (err) {
            return res.json(err);
        }
    }
}

export default ImportantQuestionController;