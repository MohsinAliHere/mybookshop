const {
	getAllBooks,
	postBook,
	deleteAllBooks,
	deleteBook,
	getSingleBook,
	editBook,
} = require("../../controlller/book");
const Check_token = require("../../middleware/checkToken");
const { upload } = require("../../utlis/cloudinary");

const router = require("express").Router();

router.get("/books", Check_token, getAllBooks);
router.post("/books", [Check_token, upload.single("image")], postBook);
router.delete("/books/:id", Check_token, deleteBook);
router.delete("/books", Check_token, deleteAllBooks);
router.get("/books/:id", Check_token, getSingleBook);
router.post("/books/:id", Check_token, editBook);

module.exports = router;
