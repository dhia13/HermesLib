const User = require('../Models/User')
const UserCtrl = {
    updateUser: async (req, res) => {
        try {
            const UserId = req.user._id
            const Params = req.params.id
            if (UserId.equals(Params)) {
                res.status(201).json({ msg: 'user updated', success: true })
            }
            else {
                res.status(401).json({ msg: 'not authorized', success: false })
            }
        } catch (error) {
            res.status(500).json({ msg: error.msg, success: false })
        }
    },
    makeAdmin: async (req, res) => {
        try {
            const UserId = req.params.id
            res.status(201).json({ msg: 'user updated', success: true })
        } catch (error) {
            res.status(500).json({ msg: error.msg, success: false })
        }
    },
    deleteAccount: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    deleteUser: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    addToFavorite: async (req, res) => {
        try {
            if (req.body.type === 'book') {
                const favoriteBook = await User.findById(req.params.id).select({ favBooks: 1 })
                if (favoriteBooks.favBook.includes(req.body.params)) {
                    await User.findByIdAndUpdate(req.params.id, {
                        $pull: {
                            favBooks: req.params.id
                        }
                    }, { new: true })
                }
                else {
                    await User.findByIdAndUpdate(req.params.id, {
                        $pull: {
                            favBooks: req.params.id
                        }
                    }, { new: true })
                }
            }
            else {
                const favoriteAuthors = await User.findById(req.params.id).select({ favAuthors: 1 })
                if (favoriteAuthors.favAuthors.includes(req.body.params)) {
                    await User.findByIdAndUpdate(req.params.id, {
                        $pull: {
                            favAuthors: req.params.id
                        }
                    }, { new: true })
                }
                else {
                    await User.findByIdAndUpdate(req.params.id, {
                        $pull: {
                            favAuthors: req.params.id
                        }
                    }, { new: true })
                }
            }
        } catch (error) {
            res.status(500).json({ msg: error.msg, succes: false })
        }
    },
    userProfile: async (req, res) => {
        try {

        } catch (error) {
            res.status(500).json({ msg: error.msg, succes: false })

        }
    },
    navbarData: async (req, res) => {
        try {
            res.status(200).json({
                success: true, msg: "navbar data", data: {
                    name: req.user.name,
                    role: req.user.role,
                    picture: req.user.picture,
                }
            })
        } catch (error) {
            res.status(500).json({ msg: error.msg, succes: false })
        }
    }

}
module.exports = UserCtrl