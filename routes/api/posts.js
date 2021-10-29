const express = require("express");
const router = express.Router();
const Post = require("../../models/Posts");
const User = require("../../models/User")
const Profile = require("../../models/Profile")
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");

// @route 	POST api/posts
// @desc 	Create a post
// @access 	Private
router.post("/",auth,[
	check("text", "Text is required").not().isEmpty()
], async(req,res) => {
	const errors = validationResult(req)
	
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}
	
	try{
		
	const user = await User.findById(req.user.id).select("-password");
	const newPost = {
		text: req.body.text,
		name: user.name,
		avatar: user.avatar,
		user: req.user.id
	}
	
	// const post = await newPost.save();
	const post = new Post(newPost);
	post.save()
		
	res.json(post);
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error")
	}
	
});

// @route 	GET api/posts
// @desc 	Get all posts
// @access 	Private
router.get("/", auth, async(req,res) => { 
	
	try{
// 		Find all posts and sort by most recent
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts)
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error")
	}
	
});

// @route 	GET api/posts/:id
// @desc 	Get post by id
// @access 	Private
router.get("/:id", auth, async(req,res) => {
	try{
		const post = await Post.findById(req.params.id);
		
		res.send(post);
	}catch(err){
		console.error(err.message);
		
		if(err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Post not found" })
		}
		
		res.status(500).send("Server error");
	}
})

// @route 	DELETE api/posts/:id
// @desc 	Delete post by ID
// @access 	Private
router.delete("/:id", auth, async(req,res) => {
	try{
		const post = await Post.findById(req.params.id)
		
		if(post.user.toString() !== req.user.id){
			return res.status(401).json({msg: "User not authorized"})
		}
		
		await post.remove()
		
		res.json({msg: "Post removed"})
	}catch(err){
		console.error(err.message);
		
		if(err.kind === "ObjectId"){
			return res.status(404).json({msg: "Post not found"})
		}
		
		res.status(500).send("Server error");
	}
});

// @route 	PUT api/posts/like/:id
// @desc 	Like a post
// @access 	Private
router.put("/like/:id", auth, async(req,res) => {
	try{
		const post = await Post.findById(req.params.id);
		
		if(post.likes.some(like => like.user.toString() === req.user.id)){
			return res.status(400).json({msg: "Post already liked" })	
		}
		
		post.likes.unshift({user: req.user.id})
		
		await post.save();
		
		res.json(post.likes)
		
	}catch(err){
		console.error(err.message);
		
		if(err.kind === "ObjectId"){
			return res.status(404).json({msg: "Post not found"})
		}
		
		res.status(500).send("Server error");
	}
});

// @route 	PUT api/posts/unlike/:id
// @desc 	Dislike a post
// @access 	Private
router.put("/unlike/:id", auth, async(req,res) => {
	try{
		const post = await Post.findById(req.params.id);
	
		
		if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
			return res.status(400).json({msg: "Post has not been liked" })	
		}
		
		const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
		
		post.likes.splice(removeIndex, 1)
		
		await post.save();
		
		res.json(post.likes)
		
	}catch(err){
		console.error(err.message);
		
		if(err.kind === "ObjectId"){
			return res.status(404).json({msg: "Post not found"})
		}
		
		res.status(500).send("Server error");
	}
});

// @route 	PUT api/posts/comment/:id
// @desc 	Add a comment to a post
// @access 	Private
router.post("/comment/:id", auth,[
	check("text", "Text is required").not().isEmpty()
], async(req,res) => {
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}
	
	try{
		const user = await User.findById(req.user.id);
		const post = await Post.findById(req.params.id);
		const newComment = {
			user: req.user.id,
			text: req.body.text,
			name: user.name,
			avatar: user.avatar
		}
		
		post.comments.unshift(newComment);
		
		await post.save();
		
		res.json(post.comments);
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// @route 	DELETE api/posts/comment/:id/:comment_id
// @desc 	Delete comment
// @access 	Private
router.delete("/comment/:id/:comment_id", auth, async(req,res) => {
	try{
		
		const post = await Post.findById(req.params.id);
		
		const comment = post.comments.find(comment => comment.id === req.params.comment_id);
// 		Check if comment exist
		if(!comment){
			return res.status(404).json({msg: "Comment does not exist"});
		}
// 		Check if user is owner
		if(comment.user.toString() !== req.user.id){
			return res.status(401).json({msg: "User not authorized"})
		}
		
		const commentIndex = post.comments.map(comment => comment.id.toString()).indexOf(req.params.comment_id)
		
		 // post.comments = post.comments.filter(({ id }) => id !== req.params.comment_id);
		
		
		post.comments.splice(comment, 1)
		
		await post.save()
		
		return res.json(post.comments);
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server error");
	}
})



module.exports = router