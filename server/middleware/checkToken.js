const jwt = require("jsonwebtoken");

const Check_token = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({
				success: false,
				message: "Authorization header is missing",
			});
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Token is missing",
			});
		}

		jwt.verify(token, process.env.PRIVATE_KEY, (err, decode) => {
			if (err) {
				return res.status(401).json({
					success: false,
					message: "Token Invalid",
				});
			}

			req.userId = decode?.userId;
			next();
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = Check_token;
