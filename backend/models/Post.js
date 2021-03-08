const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type:String,
        required:true
    }, 
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    owner: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' || 'Googleuser'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }  
})
module.exports = mongoose.model('Posts', PostSchema)