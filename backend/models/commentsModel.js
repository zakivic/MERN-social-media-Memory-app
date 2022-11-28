import mongoose from 'mongoose';


const commentsSchema = mongoose.Schema({
    comments: [
        {
        comment: String,
        userId: String,
        createdAt: {
            type: Date,
            default: new Date(),
        },
    }
    ],
    postId: String,
    
})

export default mongoose.model('Comments', commentsSchema);