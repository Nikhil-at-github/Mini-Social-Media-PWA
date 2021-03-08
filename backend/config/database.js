const mongoose = require('mongoose');
// import dotenv from 'dotenv';

const connectDB = async () => {
    try{
        MONGO_URI='mongodb+srv://nicknikhil12345:nicknikhil12345@login-signup.yt9o1.mongodb.net/login-signup?retryWrites=true&w=majority';
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
} 

module.exports = connectDB;