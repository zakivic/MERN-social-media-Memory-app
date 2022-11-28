import express from 'express';

import { 
    getComments, 
    createComment, 
    updateComment, 
    deleteOneComment 
} from '../controllers/commentsController.js';

const router = express.Router();
import auth from "../middleware/requierAuth.js";


router.get('/:commentsId', getComments);
router.post('/:id/createComment', auth, createComment);
router.patch('/:commentsId/:commentId/updateComment', auth, updateComment);
router.delete('/:commentsId/:commentId/deleteOneComment', auth, deleteOneComment);


export default router;