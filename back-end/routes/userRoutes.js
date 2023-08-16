import express from 'express';
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
} from '../controllers/userController.js';
import {
    protect,
    admin
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getUsers)
    .post(registerUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.post('/logout', logoutUser);
router.post('/login', authUser);

router.route('/:id')
    .get(protect, admin, getUserByID)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;