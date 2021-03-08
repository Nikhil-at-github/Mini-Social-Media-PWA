const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require("https-localhost")
// const dotenv = require('dotenv');
// const session = require('express-session');
// const passport = require('passport');
const connectDB = require('./config/database');

//coonect to DataBase
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


//routes
const indexRouter = require('./routes/index');
const passwordreset = require('./routes/resetpassword');
const postRouter = require('./routes/posts');

app.use(indexRouter);
app.use(passwordreset);
app.use(postRouter);

const PORT = process.env.PORT || 5000; 

app.listen(PORT, console.log(`Server is up & running in on port port no ${PORT}`));