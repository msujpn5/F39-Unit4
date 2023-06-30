const {Post} = require('../models/post')
const {User} = require('../models/user')

module.exports = {
    getAllPosts: (req, res) => {
        console.log('get all posts')
    },

    getCurrentUserPosts: (req, res) => {
        console.log('current user posts')
    },

    addPost: async (req, res) => {
        try {
            const {title, content, status, userId} = req.body 
            await Post.create({title, content, privateStatus: status, userId})
            res.sendStatus(200)
        } catch (error) {
            
        }
    },

    editPost: (req, res) => {
        console.log('edit post')
    },

    deletePost: (req, res) => {
        console.log('delete post')
    }
}