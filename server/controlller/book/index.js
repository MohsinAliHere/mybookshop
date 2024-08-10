const Book = require("../../models/Books");

exports.getAllBooks = async (req, res) => {
	try {
		const books = await Book.find();
		return res.status(200).json({
			success: true,
			data: books,
			message: "All book fetch successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.postBook = async (req, res) => {
	try {
		const { title, content } = req.body;
		const { userId } = req;
		const newBook = new Book({
			title,
			content,
			userId,
		});
		await newBook.save();
		return res.status(200).json({
			success: true,
			data: newBook,
			message: "new book successfully",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getSingleBook = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book)
			return res.status(404).json({
				success: false,
				message: "Book not found",
			});
		return res.status(200).json({
			success: true,
			data: book,
			message: "book fetch successfully",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteBook = async (req, res) => {
	try {
		const result = await Book.findByIdAndDelete(req.params.id);
		if (!result)
			return res.status(404).json({
				success: false,
				message: "Book not found",
			});
		res
			.status(200)
			.json({ message: "Book deleted successfully", success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteAllBooks = async (req, res) => {
	try {
		await Book.deleteMany();
		res.status(200).json({
			success: true,
			message: "All books deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
