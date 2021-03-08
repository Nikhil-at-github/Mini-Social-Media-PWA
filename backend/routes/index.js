const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const verifyToken = require('../Auth/Auth');

const SECRETKEY = "SamOp@123";  //hide it (add this in .env file)

// Load User model
let User = require('../models/login');
let Googleuser = require('../models/googlelogin');
let Posts = require('../models/Post');

// // get a HomePage
router.get('/', (req, res) => {
    res.send('welcome to Backend');
}) 

// Update user Profile ('/profileupdate') - POST API
router.post('/profileupdate', async (req, res) => {
    console.log("REQUEST-------------------->", req.body);

    const filter = { username: req.body.email };
    const update = { name:req.body.name };
    
    console.log("Filter Hua? --------------------------------->", filter); 

// `doc` is the document _after_ `update` was applied because of
// `new: true`
    let result1 = await User.findOneAndUpdate(filter, update, {
        new: true
    });

    let result2 = await Googleuser.findOneAndUpdate(filter, update, {
        new: true
    });

    console.log("RESULT from normal Data Base--------------------------------->", result1); 
    console.log("RESULT from Google Data Base--------------------------------->", result2);

    if(result1)
    {
        res.status(200).send({
            message: "Data Updated Successfully",
            data: result1
        });
    }
    else if(result2)
    {
        res.status(200).send({
            message: "Data Updated Successfully",
            data: result2
        });
    }
    else{
        res.status(400).send({
            message: "error no such User Exiists",
        });
    }
    
})

//logout Route
router.post('/logout', verifyToken, async (req, res) => {
    console.log('USER-DATA BLOCK', req.userData);
    res.status(200).send({
        message: "Successful logout!",
    });
})

//login route - login (POST API)
router.post('/login', async (req, res) => {
    console.log("REQUESt-------------------->", req.body);

    let result = await User.find({ username: req.body.username })

    console.log("RESULT--------------------------------->", result);

    if (result && result.length > 0) {
        const comparedPassword = await bcrypt.compare(req.body.password, result[0].password);
        if (comparedPassword) {
            console.log("PASSWORD MATCH------------------------------>>>>>>>>>>>>>>")
            jwt.sign({ result }, SECRETKEY, (err, token) => {
                if (err) {
                    res.status(403).send({
                        message: "Error"
                    })
                } else {
                    res.status(200).send({
                        token,
                        message: "Successful login!",
                        data: result
                    });
                }
            })

        }
        else {
            console.log("PASSWORD NOT MATCH--------------------------->>>>>>>>>>>>>>")
            res.status(200).send({
                message: "password Incorrect!"
            })
        }
    }
    else {
        res.status(200).send({
            message: "User Not Found!"
        });
    }
})

// <-- --------------------------------------------------------->

//signUp route - signUp (POST API)

router.post('/signup', async (req, res) => {
    let result = await User.find({ username: req.body.username })

    if (result && result.length > 0) {
        {
            console.log("uses already exists ------------------------------>>>>>>>>>>>>>>")
            res.status(200).send({
                message: "User Already Exists!"
            })
        }
    }
    else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        req.body.password = hashedPassword;
        const user = new User(req.body);
        await user.save();

        let newresult = await User.find({ username: req.body.username })

        jwt.sign({ newresult }, SECRETKEY, (err, token) => {
            if (err) {
                res.status(403).send({
                    message: "Error in Token!"
                })
            }
            else {
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
                    subject: 'Congrats Mail: SignUp On TestBench',
                    text:
                        `${newresult[0].name} \n\n`
                        + 'Thankyou for Signing Up on TestBench \n\n'
                        + `http://localhost:3000/ \n\n`
                };

                console.log("Sending Mail");

                transpoter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error('there was an Error: ', err)
                    } else {
                        console.log('here the Response: ', response);
                    }
                })

                res.status(200).send({
                    token,
                    message: "Successful signUp!",
                    data: newresult
                });
            }
        })
    }
})


//Login With Google Route - login (POST API from GOOGLE - No Password)

router.post('/googlelogin', async (req, res) => {
    console.log("REQUEST By Google Login! -------------------->", req.body);

    let result = await Googleuser.find({ username: req.body.username })

    console.log("RESULT from Google DataBase --------------------------------->", result);

//User already Exist    
    if (result && result.length > 0) {
        jwt.sign({ result }, SECRETKEY, (err, token) => {
            if (err) {
                res.status(403).send({
                    message: "Error"
                })
            } else {
                // const transpoter = nodemailer.createTransport({
                //     service: 'gmail',
                //     auth: {
                //         user: '404testbench@gmail.com', //change it to `${process.env.Email}`
                //         pass: '01$Testing', //change it to `${process.env.Email}`
                //     },
                // });

                // const mailOptions = {
                //     from: '404testbench@gmail.com',
                //     to: `${req.body.username}`,
                //     subject: 'Congrats Mail: SignUp On TestBench',
                //     text:
                //         `${newresult[0].name} \n\n`
                //         + 'Thankyou for Signing Up on TestBench \n\n'
                //         + `http://localhost:3000/ \n\n`
                // };

                // console.log("Sending Mail");

                // transpoter.sendMail(mailOptions, (err, response) => {
                //     if (err) {
                //         console.error('there was an Error: ', err)
                //     } else {
                //         console.log('here the Response: ', response);
                //     }
                // })
                res.status(200).send({
                    token,
                    message: "Successful Login!",
                    data: result
                });
            }
        })
    }
// create user in database and Login!
    else {
        const user = new Googleuser(req.body);
        await user.save();

        console.log("dosre main aya hai !st time login pe");
        let newdata = await Googleuser.find({ name: req.body.name, username: req.body.username })

        jwt.sign({ newdata }, SECRETKEY, (err, token) => {
            if (err) {
                res.status(403).send({
                    message: "Error in Token!"
                })
            }
            else {
                res.status(200).send({
                    token,
                    message: "Successful SignUp!",
                    data: newdata
                });
            }
        })
        // res.status(200).send({
        //     message: "Googleuser Not Found!"
        // });
    }
})

// <----------------------------------------------------------->

module.exports = router;