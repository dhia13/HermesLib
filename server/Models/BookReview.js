const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
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
const BookReview = mongoose.model('BookReview', ReviewSchema)
module.exports = BookReview
