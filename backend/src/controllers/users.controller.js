import User from "../models/user.model.js";
import Link from "../models/link.model.js";

export const addLink = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, url } = req.body;
    if (!title || !url) {
      return res
        .status(400)
        .json({
          success: false,
          message: "title or link field cannot be empty",
        });
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

export const deleteLink = async (req, res) => {};
export const updateLink = async (req, res) => {};

export const updateProfile = async (req, res) => {};
