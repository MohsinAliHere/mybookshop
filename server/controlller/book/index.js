const Book = require("../../models/Books");
const { uploadImage } = require("../../utlis/common");
const fs = require("fs");
const path = require("path");

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
		const file = req.file;

		if (!title || !content || !file) {
			return res.status(401).json({
				success: false,
				message: "All fields are required",
			});
		}

		const { userId } = req;
		const bookUrl = await uploadImage(file);

		const newBook = await Book.create({
			title,
			content,
			bookUrl,
			userId,
		});

		return res.status(200).json({
			success: true,
			data: newBook,
			message: "New book successfully added",
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: error.message || "Something went wrong", success: false });
	}
};

exports.getSingleBook = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book.data)
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
		res.status(500).json({ error: error.message || "Something went wrong" });
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

		bookUrl = await uploadImage("delete", result.data.bookUrl);
		res
			.status(200)
			.json({ message: "Book deleted successfully", success: true });
	} catch (error) {
		res.status(500).json({ error: error.message || "Something went wrong" });
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
		res.status(500).json({ error: error.message || "Something went wrong" });
	}
};

exports.editBook = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const { title, content } = req.body;
		let bookUrl;

		if (!title || !content) {
			return res.status(401).json({
				success: false,
				message: "title and content are required",
			});
		}

		if (req.file) {
			bookUrl = await uploadImage(req.file);
		} else {
			const existingBook = await Book.findById(_id);
			if (!existingBook) {
				return res.status(404).json({
					success: false,
					message: "Book not found",
				});
			}
			bookUrl = existingBook.bookUrl;
		}

		const result = await Book.findByIdAndUpdate(
			_id,
			{
				$set: {
					title,
					content,
					bookUrl,
				},
			},
			{ new: true }
		);

		res.status(200).json({
			data: result,
			success: true,
			message: "Book edited successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: error.message || "Something went wrong",
			success: false,
		});
	}
};
