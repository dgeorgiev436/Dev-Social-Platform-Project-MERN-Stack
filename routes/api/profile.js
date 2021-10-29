const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile")
const User = require("../../models/User")
const Post = require("../../models/Posts")
const {check, validationResult} = require("express-validator")
const config = require("config");
const request = require("request")

// @route 	GET api/profile/me
// @desc 	Get current users profile
// @access 	Private
router.get("/me", auth, async(req,res) => {
	try{
		const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "avatar"])
		if(!profile){
			return res.status(400).json({msg: "There is no profile for this user"});
		}
		
		res.json(profile)
		
		
	}catch(err){
		console.error(err.message)
		res.status(500).send("Server error")
	}
})

// @route 	POST api/profile
// @desc 	Create or update user profile
// @access 	Private

router.post("/",auth, [
	check("status", "Status is required").not().isEmpty(),
	check("skills", "Skills is required").not().isEmpty()
], async(req,res) => {
	
	const errors = validationResult(req)
	
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}
	
	const {
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin
	} = req.body;
	
	// Build profile object
	
	const profileFields = {}
	
	profileFields.user = req.user.id;
	if(company) profileFields.company = company;
	if(website) profileFields.website = website;
	if(location) profileFields.location = location;
	if(bio) profileFields.bio = bio;
	if(status) profileFields.status = status;
	if(githubusername) profileFields.githubusername = githubusername;
// 	turns string of skills into an array
	if(skills){
		profileFields.skills = skills.toString().split(",").map(skill => skill.trim())
	}
// 	Build social object
	profileFields.social = {}
	if(youtube) profileFields.social.youtube = youtube;
	if(facebook) profileFields.social.facebook = facebook;
	if(twitter) profileFields.social.twitter = twitter;
	if(instagram) profileFields.social.instagram = instagram;
	if(linkedin) profileFields.social.linkedin = linkedin;
	
	
	try{ 
		let profile = await Profile.findOne({user: req.user.id})
		
		if(profile){
// 			Find profile and update
			profile = await Profile.findOneAndUpdate({id: req.user.id}, {$set: profileFields}, {new: true})
			return res.json(profile);
		}
		
// 		Create
		profile = new Profile(profileFields);
		await profile.save();
		res.json(profile)
		
	}catch(err){
		console.errror(err.message);
		res.status(500).send("Server Error")
	}
})

// @route 	GET api/profile
// @desc 	Get all profiles
// @access 	Public
router.get("/", async(req,res) => {
	try{
		const profiles = await Profile.find().populate("user", ["name", "avatar"])
		res.json(profiles)
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error")
	}
})

// @route 	GET api/profile/user/:user_id
// @desc 	Get profile by user ID
// @access 	Public
router.get("/user/:user_id", async(req,res) => { 
	try{
		const profile = await Profile.findOne({user: req.params.user_id}).populate("user", ["name", "avatar"])
		
		if(!profile){
			return res.status(400).json({msg: "Profile not found"});
		}
		
		res.send(profile)
	}catch(err){
		console.error(err.message);
		if(err.kind == "ObjectId"){
			return res.status(400).json({msg: "Profile not found"});
		}
		res.status(500).send("Server  error");
	}
});

// @route 	DELETE api/profile
// @desc 	Delete profile, user & posts
// @access 	Private
router.delete("/", auth, async(req,res) => {
	try{
// 		Remove user posts
		await Post.deleteMany({user: req.user.id})
// 		Remove profile
		await Profile.findOneAndRemove({user: req.user.id})
// 		Remove user
		await User.findByIdAndRemove(req.user.id)
		
		res.send({msg: "User removed"})
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error")
	}
})

// @route 	PUT api/profile/experience
// @desc 	Add profile experience
// @access 	Private
router.put("/experience",auth, [
	check("title", "Title is required").not().isEmpty(),
	check("company", "Company is required").not().isEmpty(),
	check("from", "From date is required").not().isEmpty()
], async(req,res) => {
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}
	
		const {title, company, location, from, current, description, to} = req.body;
		const newExp = {title, company, location, from, current, description, to};
	
	
	try{
		const profile = await Profile.findOne({user: req.user.id});

		profile.experience.unshift(newExp);
		
		await profile.save();
		
		res.json(profile)
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error")
	}
})

// @route 	DELETE api/profile/experience/:exp_id
// @desc 	Delete profile experience
// @access 	Private
router.delete("/experience/:exp_id", auth, async(req,res) => {
	try{
		
		const profile = await Profile.findOne({user: req.user.id});
		profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.exp_id)
		await profile.save();
		return res.status(200).json(profile)
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error");
	}
})

// @route 	PUT api/profile/education
// @desc 	Add profile education
// @access 	Private
router.put("/education", auth,[
	check("school", "School is required").not().isEmpty(),
	check("degree", "Degree is required").not().isEmpty(),
	check("fieldofstudy", "Field of study is required").not().isEmpty(),
	check("from", "From date is required").not().isEmpty()
], async(req,res) => {
	
	const {school, degree, fieldofstudy, from, to, current, description} = req.body;
	const education = {school, degree, fieldofstudy, from, to, current, description};
	
	try{
		const profile = await Profile.findOne({user: req.user.id});
		profile.education.unshift(education);
		await profile.save();
		res.send(profile)
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error")
	}
});

// @route 	DELETE api/profile/education/:edc_id
// @desc 	DELETE profile education
// @access 	Private
router.delete("/education/:edc_id", auth, async(req,res) => {
	try{
		
		const profile = await Profile.findOne({user: req.user.id})
		profile.education = profile.education.filter(edc => edc._id.toString() !== req.params.edc_id)
		await profile.save();
		
		return res.status(200).json(profile)
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error");
	}
})

// @route 	GET api/profile/github/:username
// @desc 	Get user repositories from github
// @access 	Public
router.get("/github/:username", async(req,res) => {
	try{
// 		Building a options object to pass to "request"
		const options = {
			uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort==created: 			asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`,
			method: "GET",
			headers: {"user-agent": "node.js"}
		}
		
		request(options, (error, response, body) => {
			if(error) console.error(error);
			
			if(response.statusCode !== 200){
				return res.status(404).json({msg: "No Github profile found"});
			}
			
			res.json(JSON.parse(body));
		})
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error");
	}
})

module.exports = router