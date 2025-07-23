import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

 const protect=async(req ,res ,next)=>{

    try{
        console.log(req.cookies);
        
        const token=req.cookies.jwt;
        console.log(token)
        if(!token){
            return res.status(401).json({message:'User is not authorized'})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        req.user=await User.findById(decoded.id).select('-password')
        if(!req.user){
            return res.stauts(401).json({message:"User no longer exists"})


        }

        next();

    }
    catch(error){
        console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });

    }
  
   
}

export default protect;