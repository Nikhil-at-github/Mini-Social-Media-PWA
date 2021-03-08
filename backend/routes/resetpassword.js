const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


// Load User model
let User = require('../models/login');
const { getMaxListeners, exists } = require('../models/login');
const { response } = require('express');
// let Googleuser = require('../models/googlelogin');

const SECRETKEY = "SamOp@123";  //hide it (add this in .env file)

const verifyToken = (req, res, next) => {
    console.log("headerrrrrrrrrrrrrrrrrrrr++++++++++++", req.headers);
    //getting the tocken from the header
    const bearer = req.headers["authorization"]
    if (bearer) {
        const bearerToken = bearer.split(' ');
        const token = bearerToken[1];

        jwt.verify(token, SECRETKEY, (err, data) => {
            if (err) {
                res.status(403).send({
                    message: "Unvarified Token Error!"
                })
            } else {
                req.userData = data;
                next();
            }
        })
    } else {
        res.status(403).send({
            message: "Token Error!"
        })
    }
}



//FORGET Password Route - (POST API)

router.post('/resetpassword', async (req, res) => {

    console.log("DATA FROM FRONTEND ===>", req.body.username)

    let result = await User.find({ username: req.body.username })

    if (result && result.length > 0) {
        jwt.sign({ result }, SECRETKEY, async (err, token) => {
            if (err) {
                res.status(403).send({
                    message: "Error"
                })
            } 
            else {
                // const Token = token
                const filter = { username: req.body.username };
                const update = { 
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 3600000, 
                };

                // let doc = await User.findOneAndUpdate(filter, update, {
                //     new: true,
                //     upsert: true, // Make this update into an upsert
                //     rawResult: true // Return the raw result from the MongoDB driver
                //   })

                const transpoter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: '404testbench@gmail.com', //change it to `${process.env.Email}`
                        pass: '01$Testing', //change it to `${process.env.Email}`
                    },
                });

                const mailOptions = {
                    from: '404testbench@gmail.com',
                    to: `${req.body.username}`,
                    subject: 'Link to Reset Password',
                    text:
                        'password change karlo yaar \n\n'
                        + `http://localhost:3000/reset/${token} \n\n`
                };

                console.log("Sending Mail");

                transpoter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error('there was an Error: ', err)
                    } else {
                        console.log('here the Response: ', response);
                    }
                })

                let data = await User.find({ username: req.body.username })
                // console.log("User Found || Ready To Reset ------------------------------>>>>>>>>>>>>>>",token)
                res.status(200).send({
                    message: "Email Sent! Check your Inbox",
                    data,
                    token
                })
            }
        })
    }
    else {
        console.log("User NOT Found || User Doesn't Exists  ------------------------------>>>>>>>>>>>>>>")
        res.status(203).send({
            message: "Wrong Email! No Such User Exists"
        })
    }

})


//Reset Password & Update DataBase Route -final (POST API)

router.post('/reset', async (req, res) => {

    console.log("DATA FROM FRONTEND ===>", req.body.password)
    console.log("DATA FROM FRONTEND ===>", req.body.token)

    let result = await User.find({ resetPasswordToken: req.body.token })
    console.log("Resultttttttttttttttttttttttttttt  ===>", result)
    if (result && result.length > 0) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                console.log(hashedPassword);
                req.body.password = hashedPassword;
                const filter = { username: result[0].username };
                // console.log("User Found || Ready To Reset ------------------------------>>>>>>>>>>>>>>",token)

                await User.findOneAndUpdate(filter, {password: req.body.password})
                res.status(200).send({
                    message: "Password Updated!",
                })
    }
    else {
        console.log("User NOT Found || User Doesn't Exists  ------------------------------>>>>>>>>>>>>>>")
        res.status(203).send({
            message: "SomeThing Went Wrong! Recheck The Reset Link "
        })
    }

})

module.exports = router;