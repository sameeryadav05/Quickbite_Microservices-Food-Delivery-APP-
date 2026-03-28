import express from 'express';
import { addUserRole, loginUser, profile } from '../Controllers/auth.js';
import { AuthMiddleware } from '../Middlewares/Auth.middleware.js';

const router = express.Router();


router.post('/login',loginUser)
router.put('/addUserRole',AuthMiddleware,addUserRole)
router.get('/profile',AuthMiddleware,profile)

export default router;

