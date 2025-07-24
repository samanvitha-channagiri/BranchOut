import express from 'express'
import protect from '../middlewares/protect.middleware.js';
import { addLink,updateLink,updateProfile,deleteLink, getLinks } from '../controllers/users.controller.js';
const router=express.Router()


router.post('/addLink',addLink);
router.post('/updateLink',updateLink)
router.post('/updateProfile',updateProfile)
router.get('/getLinks',getLinks)
router.delete('/deleteLink',deleteLink)


export default router;