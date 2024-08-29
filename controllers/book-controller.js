const { UserModel, BookModel } = require("../models/index");
const IssuedBooks = require("../dtos/book-dto");

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

  const issuedBooks = users.map((each) => new IssuedBooks(each));

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

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    res.status(400).json({
      success: false,
      message: "No data to add a book",
    });
  }

  await BookModel.create(data);
  const allBooks = await BookModel.find();

  return res.status(201).json({
    success: false,
    message: "New book added!!",
    data: allBooks,
  });
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "Updated the book by their id",
    data: updatedData,
  });
};

// module.exports = { getAllBooks, getSingleBookByID };
