import express from "express";
import { ForgotPasswordController, LoginController, LogoutController, ResendOtpController, ResetPasswordController, SignupController, VerifyOtpForgotPasswordController, VerifyOtpSignupController } from "../Controllers/AuthControllers.js";
import profileUpload from "../middleware/upload.js";

const AuthRoute = express.Router();

AuthRoute.post("/signup", profileUpload.single("profile"), SignupController);
AuthRoute.post("/verify-otp-signup", VerifyOtpSignupController);
AuthRoute.post("/resend-otp", ResendOtpController);
AuthRoute.post("/login", LoginController);
AuthRoute.post("/logout", LogoutController);
AuthRoute.post("/forgot-password", ForgotPasswordController);
AuthRoute.post("/verify-otp-forgot-password", VerifyOtpForgotPasswordController);
AuthRoute.post("/reset-password", ResetPasswordController);

export default AuthRoute;