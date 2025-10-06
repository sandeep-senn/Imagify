import express from 'express'
import verifyToken from "../middleware/userMiddleware.js";
import { register, login, userCredits, paymentRazorpay } from "../controller/userController.js";

const userRouter = express.Router();

//http://localhost:5000/api/auth/register
userRouter.post('/register', register)
//http://localhost:5000/api/auth/login
userRouter.post('/login', login)
//http://localhost:5000/api/auth/credits
userRouter.get('/credits', verifyToken, userCredits)
//http://localhost:5000/api/auth/pay-razor
userRouter.post('/pay-razor', verifyToken, paymentRazorpay)

export default userRouter