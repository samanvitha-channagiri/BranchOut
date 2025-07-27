import express from 'express'
import protect from '../middlewares/protect.middleware.js';
import { addLink,updateLink,updateProfile,deleteLink, getLinks } from '../controllers/users.controller.js';
const router=express.Router()


router.post('/addLink',addLink);
router.post('/updateLink/:id',updateLink)
router.post('/updateProfile',updateProfile)
router.get('/getLinks',getLinks)
router.delete('/deleteLink/:id',deleteLink)


export default router;