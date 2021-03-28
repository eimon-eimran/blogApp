const express = require('express')
const router = express.Router()
const {getPosts, getPost, createPosts, updatePosts, deletePost, likePost, dislikePost, commentPost} = require('../controller/posts')
const authMiddleware = require('../middleware/auth')

router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',authMiddleware,createPosts)
router.patch('/:id',authMiddleware,updatePosts)
router.delete('/:id',authMiddleware,deletePost)
router.patch('/:id/likePost',authMiddleware,likePost)
router.post('/:id/comment',authMiddleware,commentPost)
router.patch('/:id/dislikePost',authMiddleware,dislikePost)

module.exports = router