import User from "../models/User.js";
import dotenv from "dotenv";
import ForgotPassword from "../models/ForgotPassword.js";
import Mail from "../auth/mail.js";
import bcrypt from "bcrypt";

dotenv.config();

class AuthController {

    async login(req, res, next) {
        let {email, password} = req.body;
        let errorType = {
            email: '', password: '',
        }
        let user = await User.findOne({email: email});
        if (user) {
            let isMatch = await user.comparePassword(password);
            if (isMatch) {
                let token = await user.generateToken();
                res.status(200).json({
                    success: true, token: token, user: user
                });
            } else {
                errorType.password = 'Password is incorrect';
                return res.status(200).json({error: errorType});
            }
        } else {
            errorType.email = 'Email not found';
            return res.status(200).json({error: errorType});
        }
    }

    async passwordResetLink(req, res, next) {
        let email = req.body.email;
        let findUser = await User.findOne({email: email});
        let errorType = {
            email: '',
        }
        if (findUser) {
            let userId = findUser._id;
            let token = Math.random().toString(36).slice(2);
            await ForgotPassword.create({userId: userId, token: token});
            let link = `http://localhost:3000/reset-password/${token}`;
            let body = `<h1>Reset Password</h1>
                <p>Click on the link to reset your password</p>
                <a href="${link}">Reset Password</a>
                `;
            let mailObj = new Mail();
            mailObj.sendMail(process.env.EMAIL, email, "Password Reset", body);
            return res.status(200).json({success: "Email sent successfully"});
        } else {
            errorType.email = 'Email not found';
            return res.status(200).json({error: errorType});
        }
    }

    async passwordResetConfirm(req, res) {
        let token = req.body.token;
        let findToken = await ForgotPassword.findOne({token: token});
        if (findToken) {
            let userId = findToken.userId;
            const newUser = await User.findById(userId);
            newUser.password = req.body.password;
            newUser.save();
            return res.status(200).json({success: "Password reset successfully"});
        } else {
            return res.status(200).json({error: "Invalid token"});
        }

    }

}

export default AuthController;