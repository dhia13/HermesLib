const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
        },
        rating: {
            type: Number,
        },
        content: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)
const AuthorReview = mongoose.model('AuthorReview', ReviewSchema)
module.exports = AuthorReview
