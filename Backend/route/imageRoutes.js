import express from 'express'
import { generateImage } from '../controller/userController.js'
import verifyToken from '../middleware/userMiddleware.js'

const imageRouter = express.Router();

imageRouter.post('/generate-image', verifyToken, generateImage )

export default imageRouter