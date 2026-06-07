export const updateInfo = async (req, res) => {
  try {
    const { name } = req.body;

    const user = req.user;
    user.name = name;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Info updated successfully",
    });
  } catch (error) {
    console.log("Update info : ", error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "Please upload an image",
      });
    }

    const user = req.user;
    user.avatar = req.file.path;
    await user.save();

    return res.status(200).json({
      status: "success",
      avatar: user.avatar,
    });
  } catch (error) {
    cconsole.log("Upload avatar error:", error.message); // ← log .message not error directly
    console.log("Full error:", JSON.stringify(error)); // ← full error
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
