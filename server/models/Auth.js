const mongoose = require("mongoose");
const { Schema } = mongoose;

const User_Schema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const UserModel = mongoose.model("Authentication", User_Schema);
module.exports = UserModel;
