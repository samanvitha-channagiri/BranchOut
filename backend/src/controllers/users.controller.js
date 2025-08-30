import User from "../models/user.model.js";
import Link from "../models/link.model.js";
import mongoose from "mongoose";
import isValidURL from "../utils/urlValidation.js";
export const addLink = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, url } = req.body;
    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: "title or link field cannot be empty",
      });
    }
    if(!isValidURL(url)){
      return res.status(400).json({success:false,message:"Entered url is not valid"})
    }
    

    const newLink = await Link.create({
      userId: _id,
      title: title,
      url: url,
    });
    if (newLink) {
      return res.status(200).json({
        success: true,
        message: "New link added",
        title: newLink.title,
        url: newLink.url,
        data:newLink
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create a link data",
      });
    }
  } catch (error) {
    console.log("Error while adding a link to db :", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const userId = req.user._id;
    const deleteLinkId = req.params.id;
    //trim because " ", like these empty requests
    if (!deleteLinkId || typeof deleteLinkId !== "string" || !deleteLinkId.trim()) {
      return res.status(400).json({
        success: false,
        message: "Link ID is required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(deleteLinkId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    const result = await Link.deleteOne({ _id: deleteLinkId, userId });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "No such link exists, or you are not authorized to delete it",
        });
    }
    return res
      .status(200)
      .json({ success: true, message: "deleting the link was successful" });
  } catch (error) {
    console.log(error.message)
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
export const getLinks = async (req, res) => {
  const user = req.user;
  const links = await Link.find({ userId: user._id });

  if (!links) {
    return res.status(400).json({ success: false, message: "No links found" });
  }
  return res.status(200).json({
    urls: links,
  });
};

export const updateLink = async (req, res) => {
  try {
    const user = req.user;

    const { url, title } = req.body;
    
    const linkId = req.params.id;
    const userId = user._id;

    if (!linkId || !url || !title) {
      return res
        .status(400)
        .json({
          success: false,
          message: " and new link and title  fields are required",
        });
    }
    if (!isValidURL(url)) {
      return res
        .status(404)
        .json({ success: false, message: "url is not valid" });
    }
    if (!mongoose.Types.ObjectId.isValid(linkId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    const updatedLink = await Link.findOneAndUpdate(
      { _id: linkId, userId },
      { $set: { url: url, title } },
      { new: true, runValidators: true }
    );
    if (!updatedLink) {
      return res.status(404).json({
        success: false,
        message: "No such link exists or you are not authorized",
      });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "link updated successfully",
        data: updatedLink,
      });
  } catch (error) {
    console.log("Error while updating the link :", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error while updating link",
      });
  }
};


export const updateProfile = async (req, res) => {

  try{
    const allowedFields = ["profilePictureUrl", "title", "description"];
    const user = req.user;

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });
    
    await user.save();

 return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating profile"
    });
  }
 
 

  



};

export const addProfileInfo = async (req, res) => {


};
