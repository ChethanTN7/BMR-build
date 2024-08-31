const { UserModel, BookModel } = require("../models/index");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  if (users.length == 0) {
    return res.status(404).json({
      success: false,
      message: "No users found in the DB",
    });
  }
  res.status(200).json({
    success: true,
    data: users,
  });
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User doesn't exist",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
};

exports.addNewUser = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No dat found!!!",
    });
  }

  await UserModel.create(data);
  const users = await UserModel.find();

  return res.status(200).json({
    success: true,
    message: "User added successfully",
    data: users,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({ _id: id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User doesn't exist",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  updatedUserData = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "User updated",
    data: updatedUserData,
  });
};
