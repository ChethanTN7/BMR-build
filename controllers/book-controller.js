const { UserModel, BookModel } = require("../models/index");
const userModel = require("../models/user-model");

exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No book found",
    });
  }

  return res.status(200).json({
    success: true,
    data: books,
  });
};

exports.getSingleBookByID = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book doesn't found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Book found",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuesBook");

  if (issuedBooks.length === 0) {
    return (
      res.status(404),
      express.json({
        success: false,
        message: "No book have been issued",
      })
    );
  }

  return res.status(200).json({
    success: true,
    message: "User with the issued book....",
    data: issuedBooks,
  });
};

// module.exports = { getAllBooks, getSingleBookByID };
