const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign(
		{
			userId: id,
		},
		process.env.PRIVATE_KEY
	);
};

module.exports = {
	generateToken,
};
