import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { 
        type: [String], 
        default: [] },
    commentsId: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

export default mongoose.model('Post', postSchema);