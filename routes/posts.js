const express = require('express')
const router = express.Router()
const Post = require('../models/Post.js') //the model

//GET BACK ALL THE POSTS IN DB
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find() //find() is a method in mongoose
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
})

router.get('/specific', (req,res) => {
    res.send("we are at specific")
})

//SUBMITS A POST
//first version:
// router.post('/', (req, res) => {
//     // console.log(req.body) //we need to convert the body to JSON. we will use the package body-parser for that (look at app.js)
//     // what is it originally? shows up as undefined
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     }) //create new post from the model variable Post

//     post.save() //what is .save() ?
//         .then(data => {
//             res.json(data) //post it on the screen
//         })
//         .catch(err => {
//             res.json({message: err})
//         })
// })


//second version:
router.post('/', async (req, res) => { //why would we do the async-await ?
    // console.log(req.body) //we need to convert the body to JSON. we will use the package body-parser for that (look at app.js)
    // what is it originally? shows up as undefined
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    }) //create new post from the model variable Post
    try {
        const savedPost = await post.save() //what is .save() ?
        res.json(savedPost)
    }catch(err){
        res.json({message: err})
    }
})


//GET SPECIFIC POST
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }catch(err){
        res.json({message: err})
    }
})

// DELETE POST
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId}) //_id is what MongoDB automatically made as a key
        //can we put multiple things in the object? like title and description. try it out next time
        res.json(removedPost)
    }catch(err){
        res.json({message: err})
    }
})

//UPDATE A POST
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne({_id: req.params.postId}, 
            {$set: {title: req.body.title}}
            ) //search and to-be-updated
            res.json(updatedPost)
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router