import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authModel from "../Database/Models/AuthModel.js";

dotenv.config();

export const requireAuth = async (req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(404).send({success: false, message: "authorization token missing"});
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const user = await authModel.findById(decoded._id).select("-password");
        if(!user){
            return res.status(404).send({success: false, message: "user not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({success: false, message: "invalid or expired token"});
    }
}

export const isAdmin = (req, res, next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        return res.status(400).send({success: false, message: "unauthorized access, admin only"});
    }
}
