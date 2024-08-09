const {
	getAllBooks,
	postBook,
	deleteAllBooks,
	deleteBook,
	getSingleBook,
} = require("../../controlller/book");
const Check_token = require("../../middleware/checkToken");

const router = require("express").Router();

router.get("/books", Check_token, getAllBooks);
router.post("/books", Check_token, postBook);
router.delete("/books", Check_token, deleteBook);
router.delete("/books", Check_token, deleteAllBooks);
router.post("/books/:id", Check_token, getSingleBook);

module.exports = router;
