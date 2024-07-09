import  Express  from "express";
import { Loging, Logout, addUser, getUserProfile,searchUser } from "../controllers/user-controllers.js";
import { singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
const router=Express.Router()
router.post('/new', singleAvatar,addUser);
router.post('/login',Loging);


router.get('/profile', isAuthenticated, getUserProfile);
router.get('/logout',Logout)

router.get('/search', isAuthenticated,searchUser);

export default router;