import dotenv from "dotenv";
import fs from "fs";
import LearningVideo from "../models/LearningVideo.js";
import Mail from "../auth/mail.js";
import Auth from "../auth/auth.js";
import User from "../models/User.js";
import BookVideo from "../models/Book/BookVideo.js";
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
        let price = req.body.price;
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
                        price,
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
                        price,
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
                    price,
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
                price,
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

    async showVideoForUser(req, res) {
        let type = req.params.type;
        let video = await LearningVideo.find({type: type});
        return res.status(200).json({video:video});
    }


    /*
    ===================================Payment====================================

     */

    async orderBook(req, res) {
        BookVideo.create(req.body).then((book) => {
            return res.status(200).json({booking: book, success: "Video Order successfully"});
        }).catch((err) => {
            return res.json(err);
        });
    }

    async getBooking(req, res) {
        let id = req.params.id;
        console.log(id);
        BookVideo.findById(id).populate("videoId").populate("userId").then((book) => {
            console.log(book);
            return res.status(200).json({bookingData: book});
        });
    }

    async bookingConfirm(req, res) {

        let type = req.body.type;
        let bId = req.body.bookingId;

        if (type === 'confirm') {
            BookVideo.findByIdAndUpdate(bId, {paymentStatus: 'paid'}).then((book) => {
                return res.status(200).json({success: "Booking confirmed successfully"});
            }).catch((err) => {
                return res.json(err);
            });

        } else if (type === 'approved') {
            let bookId = req.body.bookingId;
            let approvedData = await BookVideo.findByIdAndUpdate(bookId, {status: 'approved'});
            let id = approvedData._id;
            BookVideo.findById(id).populate("videoId").populate("userId").then((book) => {
                let roomType = book.videoId.title;
                let email = book.userId.email;

                let body = `Room Type: ${roomType} <br>
                            Total Price: ${book.totalPrice} <br>
                            Payment Status: ${book.paymentStatus}`;
                let mailObj = new Mail();
                mailObj.sendMail(process.env.EMAIL, email, "Booking Approved", body);
                return res.status(200).json({success: "Booking approved successfully"});

            });


        } else if (type === 'reject') {
            BookVideo.findByIdAndUpdate(bId, {status: 'reject'}).then((book) => {
                return res.status(200).json({success: "Booking reject successfully"});
            }).catch((err) => {
                return res.json(err);
            });

        } else {
            BookVideo.findByIdAndDelete(bId).then((book) => {
                return res.status(200).json({success: "Booking canceled successfully"});
            });
        }
    }

    async showOrderByLogin(req, res) {
        let token = req.headers.authorization;
        let ojb = Auth.verifyToken(token);
        let loginUser = await User.findById(ojb.id);
        if (loginUser.role === 'admin') {
            let bookingData = await BookVideo.find({})
                .populate("videoId")
                .populate("userId");
            return res.status(200).json({bookingData: bookingData});
        } else {
            let bookingData = await BookVideo.find({userId: loginUser._id})
                .populate("videoId")
                .populate("userId");
            return res.status(200).json({bookingData: bookingData});
        }

    }

}

export default LearningVideoController;