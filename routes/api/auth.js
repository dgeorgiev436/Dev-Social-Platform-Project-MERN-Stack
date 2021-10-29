const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

// @route 	GET api/auth
// @desc 	Test Route
// @access 	Public
router.get("/", auth, async(req,res) => {
	try{
		const userId = req.user.id
		const foundUser = await User.findById(userId).select("-password")
		res.send(foundUser)
	}catch(err){
		console.error(err.message)
		res.status(500).send("Server error");
	}
});

// @route 	POST api/users
// @desc 	Authenticate User & get token
// @access 	Public
router.post("/", [
// 	Validation checks with express-validator
	check("email", "Please include a valid email").isEmail(),
	check("password", "Password is required").exists()
], async(req,res) => {
// 	Gets all errors failed to pass the check
	const errors = validationResult(req);
	if(!errors.isEmpty()){
// 		Send status code 400 and an array of the errors
		return res.status(400).json({errors: errors.array() })
	}
	
	const {email, password} = req.body;
	
	try{
	// 	Check if user exists
		let user = await User.findOne({email})
		
		if(!user){
			return res.status(400).json({errors: [{msg: "Invalid credentials"}] });
		}
// 		Compare entered password with hashed password
		const isMatch = await bcrypt.compare(password, user.password);
		
// 		If not match
		if(!isMatch) { 
			return res.status(400).json({errors: [{msg: "Invalid credentials"}] });
		}
		
		
		
// 		Return json web token
		const payload = {
			user: {
				id: user.id,
			}
		}
		
		jwt.sign(
			payload, 
			config.get("jwtSecret"),
			{expiresIn: 360000}, 
			(err, token) => {
				if(err) throw err;
				res.json({token})
			});
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error");
	}
	
})



module.exports = router