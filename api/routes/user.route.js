import express from 'express';
import { deleteUser, getNotificationNumber, getsavedStatus, getUser, getUsers, profilePosts, savePost, updateUser } from '../controllers/user.controller.js';
import {verifyToken} from '../middleware/verifyToken.js';
const router = express.Router();

router.get("/",getUsers)

router.put("/:id",verifyToken,updateUser)

router.delete("/:id",verifyToken,deleteUser)

router.post("/savepost",verifyToken, savePost)

router.get("/savedstatus",verifyToken,getsavedStatus);

router.get("/profileposts",verifyToken,profilePosts)

router.get("/notification",verifyToken,getNotificationNumber);

export default router;
