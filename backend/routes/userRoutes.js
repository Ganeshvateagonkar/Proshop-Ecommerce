import express from 'express'

import {
    authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser
    , getUserById, updateUser
} from '../controllers/userController.js';
import { admin, protect } from '../middleWare/authMiddleware.js';



const router = express.Router();


router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route('/:id').delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

export default router;