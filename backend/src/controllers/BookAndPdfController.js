import dotenv from "dotenv";
import fs from "fs";
import BookAndPdf from "../models/BookAndPdf.js";

dotenv.config();
import BookAndPDFBook from "../models/Book/BookAndPDFBook.js";
import Mail from "../auth/mail.js";
import Auth from "../auth/auth.js";
import User from "../models/User.js";

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
        let price = req.body.price;
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
                        price,
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
                        price,
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
                    price,
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
                price,
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

    async showBookForUser(req, res) {
        let type = req.params.type;
        let book = await BookAndPdf.find({type: type});
        return res.status(200).json({books: book});
    }

    /*
    ===================================Payment====================================

     */

    async orderBook(req, res) {
        BookAndPDFBook.create(req.body).then((book) => {
            return res.status(200).json({booking: book, success: "Book Order successfully"});
        }).catch((err) => {
            return res.json(err);
        });

    }

    async getBooking(req, res) {
        let id = req.params.id;
        BookAndPDFBook.findById(id).populate("bookId").populate("userId").then((book) => {
            console.log(book);
            return res.status(200).json({bookingData: book});
        });
    }

    async bookingConfirm(req, res) {

        let type = req.body.type;
        let bId = req.body.bookingId;
        if (type === 'confirm') {
            BookAndPDFBook.findByIdAndUpdate(bId, {paymentStatus: 'paid'}).then((book) => {
                return res.status(200).json({success: "Booking confirmed successfully"});
            }).catch((err) => {
                return res.json(err);
            });

        } else if (type === 'approved') {
            let approvedData = await BookAndPDFBook.findByIdAndUpdate(bId, {status: 'approved'});
            let id = approvedData._id;
            BookAndPDFBook.findById(id).populate("bookId").populate("userId").then((book) => {
                let roomType = book.bookId.title;
                let email = book.userId.email;

                let body = `Room Type: ${roomType} <br>   
                            Total Price: ${book.totalPrice} <br> 
                            Payment Status: ${book.paymentStatus}`;
                let mailObj = new Mail();
                mailObj.sendMail(process.env.EMAIL, email, "Booking Approved", body);
                return res.status(200).json({success: "Booking approved successfully"});

            });


        } else if (type === 'reject') {
            BookAndPDFBook.findByIdAndUpdate(bId, {status: 'reject'}).then((book) => {
                return res.status(200).json({success: "Booking reject successfully"});
            }).catch((err) => {
                return res.json(err);
            });

        } else {
            BookAndPDFBook.findByIdAndDelete(bId).then((book) => {
                return res.status(200).json({success: "Booking canceled successfully"});
            });
        }
    }

    async showOrderByLogin(req, res) {
        let token = req.headers.authorization;
        let ojb = Auth.verifyToken(token);
        let loginUser = await User.findById(ojb.id);
        if (loginUser.role === 'admin') {
            let bookingData = await BookAndPDFBook.find({})
                .populate("bookId")
                .populate("userId");
            return res.status(200).json({bookingData: bookingData});
        } else {
            let bookingData = await BookAndPDFBook.find({userId: loginUser._id})
                .populate("bookId")
                .populate("userId");
            console.log(bookingData);
            return res.status(200).json({bookingData: bookingData});
        }

    }

}

export default BookAndPdfController;