import express from "express";
import UserController from "../controllers/UserController.js";
import Uploads from "../auth/uploads.js";

const userRoute = express.Router();

const userInstance = new UserController();

let upload = new Uploads();
let filesUploads = upload.fileUpload('uploads/users');

userRoute.get("/", userInstance.index);
userRoute.post("/", filesUploads.single('image'), userInstance.store);
userRoute.put("/", filesUploads.single('image'), userInstance.update);
userRoute.get("/:id", userInstance.show);
userRoute.delete("/:id", userInstance.delete);
userRoute.get('/user-list/show', userInstance.allUserData);
userRoute.post('/change-password', userInstance.changePassword);

export default userRoute;

