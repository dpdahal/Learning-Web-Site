import express from "express";

const UserAuthRoute = express.Router();
import AuthController from "../controllers/AuthController.js";

let authInstance = new AuthController();

UserAuthRoute.post("/", authInstance.login);
UserAuthRoute.post("/password-reset", authInstance.passwordResetLink);
UserAuthRoute.post("/password-reset-confirm", authInstance.passwordResetConfirm);


// router.post("/auth/reset/:token", middleware.ensureNotLoggedIn, async (req, res) => {
//     let token = req.params.token;
//     console.log(token)
//     let password = req.body.password1;
//
//     let confirmPassword = req.body.password2;
//     let errors = [];
//     if (password != confirmPassword) {
//         errors.push({msg: "Passwords are not matching"});
//     }
//
//     let findTokenData=await ForgotPassword.findOne({token:token});
//     if(findTokenData){
//         let userId=findTokenData.userId;
//         const newUser = await User.findById(userId);
//         newUser.password = bcrypt.hashSync(password, 10);
//         newUser.save();
//         req.flash("success", "Password reset successfully. Please login with new password.");
//         res.redirect("/auth/login");
//
//     }else{
//         req.flash("error", "Token not found");
//         res.redirect("back");
//     }
//
//
//
//
// });


export default UserAuthRoute;