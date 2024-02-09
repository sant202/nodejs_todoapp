import { alluser } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendcookie } from "../utils/features.js";



export const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await alluser.findOne({email}).select("+password");
    
        if(!user) return next(new errorHandler("Invalid email or password",404))
    
        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch) return next(new errorHandler("Invalid password",404))
    
        sendcookie(user,res,`Welcome back ${user.name}`,200);
    } catch (error) {
        next(error)
    }
}

export const register = async(req,res,next)=>{
      try {
        const {name, email, password} = req.body;

        let  user = await alluser.findOne({email});
        if(user) return next(new errorHandler("user allready exit",404))
        
        const hashedPassword = await bcrypt.hash(password,10);
 
        user = await alluser.create({
          name,
          email,
          password:hashedPassword,
        })
 
        sendcookie(user,res,"Registered successfully",201);
      } catch (error) {
        next(error)
      }
}


export const getMyprofile = (req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    })
}

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development"?"lax":none,
        secure : process.env.NODE_ENV === "Development"?false:true,
    }).json({
        success:true,
    })

}