
import express from 'express'
const router=express.Router()



router.post('/addLink',protectRoute,addLink);