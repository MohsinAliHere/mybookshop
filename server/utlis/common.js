const jwt = require("jsonwebtoken");
const { cloudinary } = require("./cloudinary");
const fs = require("fs");
const generateToken = (id) => {
	return jwt.sign(
		{
			userId: id,
		},
		process.env.PRIVATE_KEY
	);
};
const uploadImage = async (state = "upload", file) => {
	if (state === "delete") {
		const result = await cloudinary.uploader.destroy(public_id);
		return result.result;
	}
	const result = await cloudinary.uploader.upload(file.path, {
		folder: "uploads/mybookshop",
		public_id: file.originalname.split(".")[0],
	});

	fs.unlink(file.path, (err) => {
		if (err) {
			console.error("Error deleting file:", err);
		} else {
			console.log("File deleted successfully from local filesystem.");
		}
	});

	return result.secure_url;
};

module.exports = {
	generateToken,
	uploadImage,
};
