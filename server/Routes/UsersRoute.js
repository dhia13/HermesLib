const router = require('express').Router()
const UserCtrl = require('../Controllers/UsersCtrl')
const { protect, admin, superAdmin } = require('../middleware/auth')
//navbar data
router.get('/navbardata', protect, UserCtrl.navbarData)
// update User Data
router.put('/user/:id', protect, UserCtrl.updateUser)
//delete Account 
router.delete('/user/:id', protect, UserCtrl.deleteAccount)
//delete user
router.delete('/admin/:id', protect, admin, UserCtrl.deleteUser)
//Make user admin
router.put('/superAdmin/:id', protect, superAdmin, UserCtrl.makeAdmin)
//add to favorite 
router.put('/favorite/:id', protect, UserCtrl.addToFavorite)
module.exports = router