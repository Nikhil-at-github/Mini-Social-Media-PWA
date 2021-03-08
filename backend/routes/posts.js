const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyToken = require('../Auth/Auth');

// Load User model
let User = require('../models/login');
let Googleuser = require('../models/googlelogin');
let Post = require('../models/Post');
// const Post = require('../models/Post');


//Add a new Post Route -(POST API)
router.post('/postadded', async (req, res) => {
    
    console.log('Data Incoming from Frontend -----------------> ', req.body);
    
    const post = new Post(req.body);
    await post.save();

    let allposts = await Post.find({ owner : req.body.owner })
    console.log('After saving this --> ALL POSTS FROM THIS EMAIL ARE -----------------> ', allposts);
    res.status(200).send({
        data: allposts,
        message: "Post Added Successfully",
    });
})

// Update/Edit Post ('/profileupdate') - POST API
router.post('/editpost', async (req, res) => {
    console.log("REQUESt-------------------->", req.body);

    const filter = { _id: req.body._id };
    const update = { title:req.body.title, body:req.body.body, status:req.body.status };
    
    console.log("Filter Hua? --------------------------------->", filter); 

// `doc` is the document _after_ `update` was applied because of
// `new: true`
    let result1 = await Post.findOneAndUpdate(filter, update, {
        new: true
    });

    console.log("RESULT from normal Data Base--------------------------------->", result1);

    if(result1)
    {
        res.status(200).send({
            message: "Post Updated Successfully",
            data: result1
        });
    }
    else{
        res.status(400).send({
            message: "error",
        });
    }
    
})

//Every Users timeline posts - all post that individual user added --> (Pass User Email in Body when calling this API)
router.get('/mypost', async (req, res) => {
    let admin = req.query.USER;
    console.log('Data Incoming from Frontend -----------------> ', admin);
    
    let allposts = await Post.find({ owner : admin })
    console.log('ALL POSTS FROM THIS User(EMAIL) is/ARE -----------------> ', allposts);

    res.status(200).send({
        data: allposts,
        message: "Your All Post Are Here!"
    });
})

//delete a Post request --> (Pass POST details in Body when calling this API)
router.post('/deletepost', async (req, res) => {
    console.log('Data Incoming from Frontend -----------------> ', req.body);
    let Postid = req.body._id;
    // Model.findByIdAndDelete()
    let postToBeDeleted = await Post.findByIdAndDelete(Postid)
    // { _id: Postid }
    console.log('POSTS to be deleted -----------------> ', postToBeDeleted);

    if(postToBeDeleted){ 
        res.status(200).send({
            data: postToBeDeleted,
            message: "Post Deleted Succesfully!"
        });
    }
    else{
        res.status(200).send({
            // data: postToBeDeleted,
            message: "Post not Found, Retry!"
        });
    }
    
})

//Read all Public Posts Route -(GET API)
router.get('/allpost', async (req, res) => {
    let allpostsfromallusers = await Post.find({status:'public'});
    console.log('ALL PUBLIC POSTS FROM ALL USERS ARE HERE ----->>>',allpostsfromallusers)
    // console.log('All Post -------------------------------->',data);
    res.status(200).send({
        message: "All Post From All Users Are Here Only!!!!!",
        data: allpostsfromallusers
    });
}) 

module.exports = router;