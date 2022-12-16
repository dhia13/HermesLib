const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25
        },
        userName: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        emailConfermation: {
            type: Boolean,
            default: false
        },
        favBooks: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Book',
            default: []
        },
        favAuthors: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Author',
            default: []
        },
        authorReviews: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'AuthorReview',
            default: []
        },
        bookReviews: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'BookReview',
            default: []
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user",
        },
        mode: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
        language: {
            type: String,
            enum: ['english', "arabic", "frensh"],
            default: 'english'
        },
        picture: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
)
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', UserSchema)
module.exports = User

