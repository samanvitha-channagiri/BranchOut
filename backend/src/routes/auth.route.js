import express from 'express'

import { signup,login,logout,userInfo, checkAuthentication } from '../controllers/auth.controller.js';
import protect from '../middlewares/protect.middleware.js';
const router=express.Router()

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.get('/check',protect,checkAuthentication)
router.get('/me',protect,userInfo);
// router.get('/verify-email',verifyEmail);


export default router;