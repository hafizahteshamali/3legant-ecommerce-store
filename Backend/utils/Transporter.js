import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config();

const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.PORTAL_EMAIL,
        pass: process.env.PORTAL_PASSWORD,
    },
    priority: "high"
})

export default Transporter;