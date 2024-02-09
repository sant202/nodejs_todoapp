import  {alluser}  from "../models/user.js";
import Jwt  from "jsonwebtoken";


export const isAuthenticate = async(req,res,next)=>{
       
     const { token } = req.cookies;

     if(!token) return res.status(404).json({
        success:false,
        message:"Login first",
     })

      const decoded = await Jwt.verify(token, process.env.JWT_SECRET);

     req.user = await alluser.findById(decoded._id);
     next()
}