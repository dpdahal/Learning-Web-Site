import express from "express";
import multer from "multer";

import BookAndPdfController from "../controllers/BookAndPdfController.js";

const bpRoute = express.Router();
let pbInstance = new BookAndPdfController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/book');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

bpRoute.get("/", pbInstance.index);
bpRoute.post("/", upload.single('image'), pbInstance.store);
bpRoute.get("/:id", pbInstance.show);
bpRoute.put("/", upload.single('image'), pbInstance.update);
bpRoute.delete("/:id", pbInstance.destroy);
bpRoute.get('/show-book-for-user/:type', pbInstance.showBookForUser);

/*
=================Start Payment=================
 */

bpRoute.post('/book', pbInstance.orderBook)
bpRoute.post('/booking-confirm', pbInstance.bookingConfirm)
bpRoute.get('/book/order/show-order-by-login', pbInstance.showOrderByLogin)
bpRoute.get('/booking/:id', pbInstance.getBooking)


/*
=================End Payment=================
 */

export default bpRoute;