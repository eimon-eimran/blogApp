const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title : String,
    content : String,
    name : String,
    creator : String,
    tags : [String],
    likes : {
        type : [String],
        default : []
    },
    dislikes : {
        type : [String],
        default : []
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    comments : {
        type : [Object],
        default : []
    }
})

const PostMessage = mongoose.model('PostMessage',postSchema)

module.exports = PostMessage