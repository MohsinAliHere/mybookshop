const Book_Schema = require("../../models/Books");

const getAllBooks = async (req, res) => {
	try {
		const getAllbooks = await Book_Schema.find({});
		if (getAllbooks) {
			return res.json({
				success: true,
				message: "get All Books successfully",
				data: getAllbooks,
			});
		}
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};
const postBook = async (req, res) => {
	try {
		console.log(req);
		const { title, content } = req.body;
		if (!title || !content) {
			return res.json({
				success: false,
				message: "All field are required !",
			});
		}

		const create_book = await Book_Schema.create({
			title,
			content,
			user_id: req.userId,
		});

		if (create_book) {
			return res.json({
				success: true,
				message: "Book create successfully",
				data: create_book,
			});
		}
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};
const deleteAllBooks = async (req, res) => {
	try {
		const removeAllbooks = await Book_Schema.deleteMany({});
		if (removeAllbooks) {
			return res.json({
				success: true,
				message: "Remove All Books successfully",
				data: create_book,
			});
		}
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};
const deleteBook = (req, res) => {};
const getSingleBook = async (req, res) => {
	const { userId } = req;
	const { id } = req.params;

	try {
		const getSinglebook = await Book_Schema.findOne({
			_id: id,
			userId: userId,
		});

		if (getSinglebook) {
			return res.json({
				success: true,
				message: "Get single book successfully",
				data: getSinglebook,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: "Book not found",
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	getAllBooks,
	postBook,
	deleteAllBooks,
	deleteBook,
	getSingleBook,
};
