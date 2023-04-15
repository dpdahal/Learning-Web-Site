import express from "express";
import multer from "multer";

import ImportantQuestionController from "../controllers/ImportantQuestionController.js";
import bpRoute from "./book.js";

const iqRoute = express.Router();
let iqInstance = new ImportantQuestionController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/iq');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

iqRoute.get("/", iqInstance.index);
iqRoute.post("/", upload.single('image'), iqInstance.store);
iqRoute.get("/:id", iqInstance.show);
iqRoute.put("/", upload.single('image'), iqInstance.update);
iqRoute.delete("/:id", iqInstance.destroy);
iqRoute.get('/show-important-question-for-user/:type', iqInstance.showImportantQuestionForUser);


export default iqRoute;