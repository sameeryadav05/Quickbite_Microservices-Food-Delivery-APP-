import express from 'express';
import { addUserRole, loginUser, profile } from '../Controllers/auth.js';
import { AuthMiddleware } from '../Middlewares/Auth.middleware.js';
import { createRatelimiter } from '../Utils/RateLimiter.js';
import { ProfileRatelimiter } from '../Middlewares/ProfileRateLimiter.js';

const router = express.Router();


const LoginRateLimit = createRatelimiter('auth:profile',5,60);

router.post('/login',LoginRateLimit,loginUser)
router.put('/addUserRole',AuthMiddleware,addUserRole)
router.get('/profile',AuthMiddleware,ProfileRatelimiter,profile)

export default router;

