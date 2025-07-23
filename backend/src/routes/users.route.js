import express from 'express'
import protect from '../middlewares/protect.middleware.js';
import { addLink,updateLink,updateProfile,deleteLink } from '../controllers/users.controller.js';
const router=express.Router()


router.post('/addLink',addLink);
router.post('/updateLink',updateLink)
router.post('/updateProfile',updateProfile)
router.delete('/deleteLink',deleteLink)


export default router;