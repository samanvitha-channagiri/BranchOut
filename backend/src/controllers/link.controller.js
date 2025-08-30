import User from "../models/user.model.js";
import Link from "../models/link.model.js";

export const getAllLinks = async (req, res) => {
  try {
    const username = req.params.username;

    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
  

    const links = await Link.find({ userId: userExist._id });
    if (!links) {
      return res.status(200).json({ message: "No url exists" });
    }
    //maybe just check for security, like is your form of sending the data proper
    return res.status(200).json({
      message: `Urls of the username ${username}`,
      success: true,
      data: {
        user:{username:userExist.username,title:userExist.title,description:userExist.description,profilePictureUrl:userExist.profilePictureUrl},
        links: links,
        count: links.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching links",
      error: error.message,
    });
  }
};
