import express from 'express';
import mongoose from 'mongoose';

import Comments from '../models/commentsModel.js';


const router = express.Router();

export const getComments = async (req, res) => {
    const { commentsId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentsId)) return res.status(404).send(`No post with id: ${commentsId}`);
    
    try {
        const comments =  await Comments.findById(commentsId);
        res.status(201).json(comments);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}



export const createComment = async (req, res) => {

    
    if (!req.userId)  return res.json({ message: "Unauthenticated" });
        
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const { cmt } = req.body;

    try {
        const cmts = await Comments.findById(id);
        cmts.comments.push({ comment: cmt, userId: req.userId, createdAt: new Date().toISOString() });
        const updatedComments = await Comments.findByIdAndUpdate(id, cmts, { new: true });
        res.status(201).json(updatedComments);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateComment = async (req, res) => {

    const { commentsId } = req.params;
    const { commentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(commentsId)) return res.status(404).send(`No post with id: ${commentsId}`);
    if (!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).send(`No post with id: ${commentId}`);
    
    const { comment } = req.body;
    const cmts = await Comments.findById(commentsId);
    const index = cmts.comments.findIndex(comment => comment._id.equals(commentId));
    cmts.comments[index].comment = comment;

    const updatedCmts = await Comments.findByIdAndUpdate(commentsId, cmts, { new: true });
  
    res.json(updatedCmts);
}

export const deleteOneComment = async (req, res) => {

    const { commentsId } = req.params;
    const { commentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(commentsId)) return res.status(404).send(`No post with id: ${commentsId}`);
    if (!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).send(`No post with id: ${commentId}`);
    
    const cmts = await Comments.findById(commentsId);
    const index = cmts.comments.findIndex(comment => comment._id.equals(commentId));
    cmts.comments.splice(index, 1);
    await Comments.findByIdAndUpdate(commentsId, cmts, { new: true });
    res.json({ message: "Comment deleted successfully." });
    
}


export default router;