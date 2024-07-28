const { default: mongoose } = require("mongoose");

const Connect_Db = async () => {
	try {
		const db = await mongoose.connect(process.env.DB_STRING);
		console.log("Database Connecting Succesfully");
	} catch (error) {
		console.log("Database Connecting Failed", error.message);
	}
};

module.exports = Connect_Db;
