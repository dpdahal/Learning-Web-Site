import dotenv from "dotenv";
import fs from "fs";
import BookAndPdf from "../models/BookAndPdf.js";
dotenv.config();

class BookAndPdfController {
    async index(req, res) {
        const iq = await BookAndPdf.find({});
        return res.status(200).json({iq});
    }

    async store(req, res) {
        try {
            let imageName = "";
            if (req.file) {
                imageName = req.file.filename;
            }
            return await BookAndPdf.create({...req.body, image: imageName}).then((iqs) => {
                return res.status(200).json({success: "Book created successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        console.log(req.body);
        let id = req.body.id;
        let type = req.body.type;
        let title = req.body.title;
        let description = req.body.description;
        let findData = await BookAndPdf.findById(id);
        let imageName = "";
        if (req.file) {
            imageName = req.file.filename;
            if (imageName) {
                let image = findData.image ?? "";
                let filePath = process.cwd() + "\\public\\uploads\\book\\" + image;
                if (fs.existsSync(filePath) && image) {
                    console.log("file exist");
                    fs.unlinkSync(filePath);
                    return await BookAndPdf.findByIdAndUpdate(id, {
                        type,
                        title,
                        description,
                        image: imageName
                    }).then((banner) => {
                        return res.status(200).json({success: "Book updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                } else {
                    return await BookAndPdf.findByIdAndUpdate(id, {
                        type,
                        title,
                        description,
                        image: findData.image
                    }).then((banner) => {
                        return res.status(200).json({success: "Vook updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                }
            } else {
                return await BookAndPdf.findByIdAndUpdate(id, {
                    type,
                    title,
                    description,
                    image: findData.image
                }).then((book) => {
                    return res.status(200).json({success: "Book updated successfully"});
                }).catch((err) => {
                    return res.json(err);
                });
            }
        } else {
            return await BookAndPdf.findByIdAndUpdate(id, {
                type,
                title,
                description,
                image: findData.image
            }).then((banner) => {
                return res.status(200).json({success: "Book update successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        }

    }

    async show(req, res) {
        let id = req.params.id;
        try {
            let iq = await BookAndPdf.findById(id);
            return res.status(200).json({iq});
        } catch (err) {
            return res.json(err);
        }
    }

    async destroy(req, res) {
        let id = req.params.id;
        let findData = await BookAndPdf.findById(id);
        if (findData.image) {
            let image = findData.image ?? "";
            let filePath = process.cwd() + "\\public\\uploads\\book\\" + image;
            if (fs.existsSync(filePath) && image) {
                fs.unlinkSync(filePath);
                await BookAndPdf.findByIdAndDelete(id);
                return res.status(200).json({success: "Book deleted successfully"});
            }
            await BookAndPdf.findByIdAndDelete(id);
            return res.status(200).json({success: "Book deleted successfully"});
        } else {

            try {
                await BookAndPdf.findByIdAndDelete(id);
                return res.status(200).json({success: "Book deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }

}

export default BookAndPdfController;