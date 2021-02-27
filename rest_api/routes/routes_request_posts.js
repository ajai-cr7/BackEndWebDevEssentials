const express = require('express');
const router = express.Router();
const Post = require('../models/posts_is_names');
const bodyParser = require('body-parser');
//when we want some information from server use get method , if we want to store
//some info use post ..... '/' is route


//submits a post
router.post('/' , async (req,res)=>{
	const post = new Post(
	{
			title : req.body.title,
			description : req.body.description
	}
	);
	try{
		const savedPost = await post.save();
		res.json(savedPost);
	}
	catch(err)
	{
		res.json({message : err});
	}
	
	
	/*
	post.save()
	.then(data =>
	{
		res.json(data);
	}
	)
	.catch(err => {
		res.json({message : err});
	});
	*/
});


//gets back all the posts
router.get('/',async(req,res)=>{ 
	try{
		const posts = await Post.find();
		res.json(posts);
	}catch(err)
	{
		res.json({message : err});
	}
});

//get a specific post
router.get('/:postId',async (req,res)=>{
	const post = await Post.findById(req.params.postId);
	res.json(post); //put this code in same try catch
} );


//delete post

router.delete('/:postId',async(req,res)=>{
	const removedPost = await Post.remove({_id : req.params.postId});
	res.json(removedPost);//use try catch here
});



//update a post
router.patch('/:postId',async (req,res)=>{
	try{
	const updatedPost = await  Post.updateOne(
	{_id : req.params.postId},
	{$set : {title : req.body.title } }
	);
	res.json(updatedPost);
	}catch(err){
		res.json({message : err});
	}
})











//to understand the basic 
router.get('/specific',(req,res)=>{
	res.send('specific posts');
});
module.exports = router;
