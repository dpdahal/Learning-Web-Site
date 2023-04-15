import express from "express";
import multer from "multer";

import LearningVideoController from "../controllers/LearningVideoController.js";
const lvRoute = express.Router();
let lvInstance = new LearningVideoController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/video');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

lvRoute.get("/", lvInstance.index);
lvRoute.post("/", upload.single('video'), lvInstance.store);
lvRoute.get("/:id", lvInstance.show);
lvRoute.put("/", upload.single('video'), lvInstance.update);
lvRoute.delete("/:id", lvInstance.destroy);
lvRoute.get('/video/:type', lvInstance.showVideoForUser);

/*
===================Start Payment=================
 */

lvRoute.post('/video', lvInstance.orderBook)
lvRoute.post('/video/video/video-confirm', lvInstance.bookingConfirm)
lvRoute.get('/video/order/show-order-by-login', lvInstance.showOrderByLogin)
lvRoute.get('/video-get/:id', lvInstance.getBooking)



export default lvRoute;