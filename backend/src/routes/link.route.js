
import express from 'express'
import {getAllLinks} from '../controllers/link.controller.js'
const router=express.Router()

router.get('/:username',getAllLinks);


export default router;



