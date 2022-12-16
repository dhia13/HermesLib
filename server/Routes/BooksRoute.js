const router = require("express").Router();
const BooksCtrl = require("../controllers/BooksCtrl");
const { admin, protect } = require("../middleware/auth");
//add Book
router.post("/", protect, admin, BooksCtrl.addBook);

module.exports = router;
