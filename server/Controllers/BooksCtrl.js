const User = require("../Models/User");
const Book = require("../Models/Book");

const BooksCtrl = {
  addBook: async (req, res) => {
    try {
      console.log("Add Book Route");
    } catch (error) {}
  },
};

module.exports = BooksCtrl;
