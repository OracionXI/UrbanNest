import express from 'express';
import { deleteUser, getNotificationNumber, getSavedPosts, getUserPosts, getUsers, savePost, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/',getUsers);
// router.get('/search/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post("/save", verifyToken,savePost);
router.get('/savedPosts', verifyToken, getSavedPosts);
router.get('/userPosts', verifyToken, getUserPosts);
router.get("/notification", verifyToken, getNotificationNumber);

export default router;