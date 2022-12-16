const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    info: {
        pages: {
            type: Number
        },
        cover: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMMwS7fqFrpMTwZOFzSS11bvIsUmFSu5TVI1WvHmuLb_Zr_DiRDabQPGOxLOY3vhEZBpk&usqp=CAU'
        },
        about: {
            type: String,
            default: ''
        },
    },
    genres: {
        type: Array
    },
    links: {
        internetArchiveLink: {
            type: String,
            default: ''
        },
        goodReadsLink: {
            type: String,
            default: ''
        },
    },
    languages: {
        language: {
            type: String,
            enum: ['english', 'arabic', 'frensh', 'dutsh', 'russian', 'espagniole', 'latin'],
            default: 'english'
        },
        originalLanguage: {
            type: String,
            enum: ['english', 'arabic', 'frensh', 'dutsh', 'russian', 'espagniole', 'latin'],
            default: 'english'
        },
        translator: {
            type: String,
            default: ''
        },
    },
    publish: {
        publisher: {
            type: String,
            default: ''
        },
        publishDate: {
            type: Date,
            default: ''
        },
        publishedIn: {
            type: String,
            default: ''
        },
        edition: {
            type: String,
            default: ''
        },
    },
    ratings: {
        reviews: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'BookReview',
            default: []
        },
        ratingCount: {
            type: Number,
            default: 0
        }
    },
    likes: {
        likers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        likesCount: {
            type: Number,
            default: 0
        }
    },
    hardBook: [{
        physicalCopies: {
            type: Number,
            default: 1
        },
        location: {
            library: {
                type: String,
                default: 'main'
            },
            section: {
                type: String,
                default: ''
            },
            row: {
                type: String,
                default: ''
            }
        },
        availableCopies: {
            type: Number,
            default: 1
        },
        copiesId: {
            type: Array,
            default: []
        },
        available: {
            type: Boolean,
            default: true
        },
    }],
    rentedCopied: {
        type: Number,
        default: 0
    },
    rentedTo: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Transaction',
        default: []
    },
    price: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ['issue', 'readOnly', 'eBook', 'none', 'merch', 'issueAndMerch'],
        default: 'none'
    },
},
    { timestamps: true }
)
const Book = mongoose.model('Book', bookSchema);
module.exports = Book