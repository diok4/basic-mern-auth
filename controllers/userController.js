import userModel from "../model/userModel.js";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "UserId is required" });

    const user = await userModel.findById(userId, {
      password: 0,
      __v: 0,
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const userData = {
      username: user.username,
      isAccountVerified: user.isAccountVerified,
      email: user.email,
    };

    res.json({ success: true, userData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
