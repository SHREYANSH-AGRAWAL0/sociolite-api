const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'like'
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('comment', commentSchema); 