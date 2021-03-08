const jwt = require('jsonwebtoken');

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

module.exports = verifyToken;