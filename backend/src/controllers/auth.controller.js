import User from '../models/user.model.js'
import mongoose from 'mongoose'
import generateToken from '../utils/generateToken.js';



export const  signup=async(req,res)=>{
  try{
 
    const {username, email,password}=req.body;

    if(!username||!email||!password){
      return res.status(400).json({message:"No fileds can be empty"})
    }
     if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
         if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters long' });
        }
        
         
         const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        const user=await User.create({
          username,
          email,
          password
        })
        const token=generateToken(user._id)
          res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict", 
      secure: process.env.NODE_ENV === "production",
    });
        if(user){
          return res.status(201).json({
            _id:user._id,
            username:user.username,
            profilePictureUrl:user.profilePictureUrl,
            title:user.title,
            description:user.description,
            
          })
        }else{
          return res.status(400).json({message:"Invalid user data"})
        }

  }catch(error){
         console.error("Error during user registration:",error)
         return res.status(500).json({message:'Server error during registration, Please try again later'})
  }
}

export const login=async (req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email||!password){
      return res.status(400).json({message:"Please enter email and password"})
    }
    //I've made the select field for password false in the User schema, but here I want to fetch the password, so that I can compare it with the user input.
    const user=await User.findOne({email}).select('+password')
    if(!user){
      return res.status(401).json({message:"Invalid credentials"})
    }

    const doesPasswordMatch=await user.matchPassword(password)

    if(!doesPasswordMatch){
      return res.status(401).json({message:"Invalid credentials"});
    }
    const token=generateToken(user._id);
       res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
    return res.json({
      _id:user._id,
      username:user.username,
      email:user.email,
      profilePictureUrl:user.profilePictureUrl,
      title:user.title,
      description:user.description,
      

    })


  }catch(error){
  console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const logout=async(req,res)=>{
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });

}
export const checkAuthentication=async(req,res)=>{

  try{
    const user=req.user;
  if(user){
 
    return res.status(200).json({
      _id:user._id,
      username:user.username,
      email:user.email,
      profilePictureUrl:user.profilePictureUrl,
      title:user.title,
      description:user.description,
    })
  }
  }catch(error){
    console.log("Error in the check(authentication) controller :",error.message);
    res.status(500).json({success:false,message:"Internal server error"});

  }
  
}
export const userInfo=async(req,res)=>{
  const user=req.user;
  if(!user){
    return res.staus(400).json({message:"User is not authenticated"});
  }
  return res.json({
     _id:user._id,
            username:user.username,
            profilePictureUrl:user.profilePictureUrl,
            title:user.title,
            description:user.description,
  })
}