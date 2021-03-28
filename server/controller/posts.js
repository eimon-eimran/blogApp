const PostMessage = require('../models/postMessage')
const mongoose = require('mongoose')

const getPosts = async (req,res) => {
    try {
        const postMessage = await PostMessage.find()
        res.status(200).json(postMessage)

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const getPost = async (req,res) => {
    const {id} = req.params
    try {
        const postMessage = await PostMessage.findById(id)
        res.status(200).json(postMessage)

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createPosts = async (req,res) => {
    const post = req.body
    const newPost = new PostMessage({...post, creator : req.userId, createdAt : new Date().toISOString()})
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

const updatePosts = async (req,res) => {
    const {id : _id} = req.params
    const post = req.body
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No postwith the id')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post, _id},{new: true})

    res.json(updatedPost)
}

const deletePost  = async (req,res) => {
    const { id : _id } = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with the id')

    await PostMessage.findByIdAndRemove(_id)

    res.json({message : 'Post Deleted Successfully'})
}


const commentPost = async (req, res) => {
    const { id } = req.params
    const comment = Object.keys(req.body)[0]
    
    if(!req.userId) return res.json({message : 'Unauthorized'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the id')
    const post = await PostMessage.findById(id)
    post.comments.push(comment)
    const commentedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
    res.json(commentedPost)
}


    const likePost = async (req,res) => {
        const { id } = req.params
        if(!req.userId) return res.json({message : 'Unauthorized'})
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the id')
        const post = await PostMessage.findById(id)
        const index = post.likes.findIndex(id => id === String(req.userId))
        if(index === -1){
            post.likes.push(req.userId)
        }
        else{
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }
        const likedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
        res.json(likedPost) 
    }

const dislikePost = async (req,res) => {
    const { id } = req.params
    
    if(!req.userId) return res.json({message : 'Unauthorized'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the id')
    const post = await PostMessage.findById(id)
    const index = post.dislikes.findIndex(id => id === String(req.userId))
    if(index === -1){
        post.dislikes.push(req.userId)
    }
    else{
        post.dislikes = post.dislikes.filter(id => id !== String(req.userId))
    }
    const dislikedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
    res.json(dislikedPost)  
}

module.exports = {getPosts, createPosts, updatePosts, deletePost, likePost, dislikePost, getPost, commentPost}