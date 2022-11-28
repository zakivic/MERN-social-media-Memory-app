import express from 'express';

import { 
    getPages, 
    getPosts, 
    getPostsBySearch, 
    getPostsByCreator, 
    getPost, 
    createPost, 
    updatePost, 
    likePost, 
    commentPost, 
    deletePost 
} from '../controllers/postController.js';

const router = express.Router();
import auth from "../middleware/requierAuth.js";

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/pages', getPages);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;