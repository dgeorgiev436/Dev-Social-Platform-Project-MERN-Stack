const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require("express-validator")
const User = require("../../models/User")

// @route 	POST api/users
// @desc 	Register User
// @access 	Public
router.post("/", [
// 	Validation checks with express-validator
	check("name", "Name is required").not().isEmpty(),
	check("email", "Please include a valid email").isEmail(),
	check("password", "Please enter a password with 6 or more characters").isLength({
		min: 6
	})
], async(req,res) => {
// 	Gets all errors failed to pass the check
	const errors = validationResult(req);
	if(!errors.isEmpty()){
// 		Send status code 400 and an array of the errors
		return res.status(400).json({errors: errors.array() })
	}
	
	const {name, email, password} = req.body;
	
	try{
	// 	Check if user exists
		let user = await User.findOne({email})
		
		if(user){
			return res.status(400).json({errors: [{msg: "User already exists"}] });
		}
		
// 		Get user gravatar
		const avatar = gravatar.url(email, {s: "200", r: "pg", d: "mm"});
// 		Encrypt password with bcryptjs
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt)
// 		Create the user instance
		user = new User({
			name,
			email,
			avatar, 
			password: hashedPassword
		})
// 		Save user
		await user.save();
		
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