import express from "express";
import userRoute from "./user.js";
import UserAuthRoute from "./auth.js";
import iqRoute from "./iq.js";

const apiRoute = express.Router();
apiRoute.use('/login', UserAuthRoute);
apiRoute.use("/users", userRoute);
apiRoute.use("/iq", iqRoute);
export default apiRoute;