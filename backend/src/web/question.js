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
qRoute.get('/', qInstance.index);
qRoute.post('/check-playing', qInstance.checkPlayingTimeAnswer);
qRoute.post('/insert-answer', qInstance.insertAnswer);
qRoute.post('/check-answer', qInstance.checkAnswer);


qRoute.post('/', upload.fields([
    {name: 'image'},
    {name: 'optionAImage'},
    {name: 'optionBImage'},
    {name: 'optionCImage'},
    {name: 'optionDImage'}
]), qInstance.store);

qRoute.delete('/:id', qInstance.destroy);

qRoute.get('/suggest/question', qInstance.suggestQuestion);
qRoute.post('/suggest/add', qInstance.addSuggestQuestion);
qRoute.delete('/suggest/delete/:id', qInstance.deleteSuggestQuestion);



export default qRoute;