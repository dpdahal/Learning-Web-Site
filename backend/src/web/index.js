import express from "express";
import userRoute from "./user.js";
import UserAuthRoute from "./auth.js";
import iqRoute from "./iq.js";
import lvRoute from "./lv.js";
import bpRoute from "./book.js";
import qRoute from "./question.js";

const apiRoute = express.Router();
apiRoute.use('/login', UserAuthRoute);
apiRoute.use("/users", userRoute);
apiRoute.use("/iq", iqRoute);
apiRoute.use("/lv", lvRoute);
apiRoute.use("/question", qRoute);

apiRoute.use("/book", bpRoute);
export default apiRoute;