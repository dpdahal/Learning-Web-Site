import express from "express";
import multer from "multer";
import QuestionController from "../controllers/QuestionController.js";
const qRoute = express.Router();
let qInstance = new QuestionController()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/question');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

qRoute.post('/', upload.fields([
    {name: 'image'},
    {name: 'optionAImage'},
    {name: 'optionBImage'},
    {name: 'optionCImage'},
    {name: 'optionDImage'}
]), qInstance.store);


export default qRoute;