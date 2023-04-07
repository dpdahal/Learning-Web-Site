import express from "express";

const UserAuthRoute = express.Router();
import AuthController from "../controllers/AuthController.js";

let authInstance = new AuthController();

UserAuthRoute.post("/", authInstance.login);

export default UserAuthRoute;