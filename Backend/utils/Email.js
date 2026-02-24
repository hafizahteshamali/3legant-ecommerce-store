import dotenv from "dotenv";
import Transporter from "./Transporter.js";

dotenv.config();

const sendEmailOTP = async (mail, subject, html)=>{
    try {
        await Transporter.sendMail({
            from: process.env.PORTAL_EMAIL,
            to: mail,
            subject: subject,
            html: html,
        })

        console.log("OTP email sent to:", mail);
    } catch (error) {
        console.error("Email sending error:", error);
    }    
}

export default sendEmailOTP;

