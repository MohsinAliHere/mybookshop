const { signIn, signUp, getUserData } = require("../../controlller/Auth");
const Check_token = require("../../middleware/checkToken");
const router = require("express").Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.get("/getUserData", Check_token, getUserData);

module.exports = router;
