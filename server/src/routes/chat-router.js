import Express from "express";
import { addMember, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, sendAttachments } from "../controllers/chat-controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { attachmentMulter } from "../middleware/multer.js";
const router=Express.Router()

//alt+shift+O [remove unused imports]

//this way we can use authenticate after this all routes will be protected 
router.use(isAuthenticated)

router.post('/new',newGroupChat);
router.get('/my',getMyChats);
router.get('/my/groups',getMyGroups);
router.put('/addmember',addMember);
router.put('/remove',removeMember)
router.delete('/leave/:id',leaveGroup);

router.post('/message',attachmentMulter,sendAttachments)

// router.post('/chat/:id',xyz)
// intsterd of this we can write this way
router.router('/:id').get().delete().post().put()

export default router;