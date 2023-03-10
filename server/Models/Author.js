const mongoose = require('mongoose')
const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    born: {
        type: Date
    },
    died: {
        type: Date
    },
    bio: {
        type: String
    },
    wikiPage: {
        type: String
    },
    books: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        default: []
    },
    genres: {
        type: Array,
        default: []
    },
    country: {
        type: String
    },
    picture: {
        type: String,
        default: ''
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'AuthorReview',
        default: []
    },
    rating: {
        type: Number,
        default: 0
    },
    language: {
        type: String
    }
},
    { timestamps: true }
)
const Author = mongoose.model('Author', authorSchema);
module.exports = Author