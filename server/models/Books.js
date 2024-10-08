const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Book Schema
const BookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		bookUrl: {
			type: String,
			require: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;
