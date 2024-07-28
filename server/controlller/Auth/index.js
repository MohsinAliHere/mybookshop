const User_model = require("../../models/Auth");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utlis/common");
const signUp = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.json({
				success: false,
				message: "All fields are required",
			});
		}

		const userExists = await User_model.exists({ email });

		if (userExists) {
			return res.json({
				success: false,
				message: email + "are already registered please try another",
			});
		}

		const securePassword = await bcrypt.hash(password, 10);

		const registerUser = await User_model.create({
			username,
			email,
			password: securePassword,
		});

		const { password: PrivateField, ...data } = registerUser.toObject();

		return res.json({
			success: true,
			message: "User register successfully",
			data,
			token: generateToken(registerUser._id),
		});
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.json({
				success: false,
				message: "All fields are required",
			});
		}

		const userExists = await User_model.findOne({ email });

		if (!userExists) {
			return res.json({
				success: false,
				message: "User not Found",
			});
		}

		const matchPassword = await bcrypt.compare(password, userExists.password);
		const { password: PrivateField, ...data } = userExists.toObject();

		if (matchPassword) {
			return res.json({
				success: true,
				message: "User login successfully",
				data,
				token: generateToken(userExists._id),
			});
		} else {
			return res.json({
				success: false,
				message: "Password incorrect try again",
			});
		}
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};

const getUserData = async (req, res) => {
	const getUserData = await User_model.findById(req.userId);

	const { password: PrivateField, ...data } = getUserData.toObject();

	if (!getUserData) {
		return res.json({
			message: "User not Found",
			success: false,
		});
	}
	return res.json({
		message: "User data fetch successfully ",
		success: true,
		data,
	});
};

module.exports = {
	signIn,
	signUp,
	getUserData,
};
