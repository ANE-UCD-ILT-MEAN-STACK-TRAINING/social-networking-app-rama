const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //a tokec typically would look like "Bearer aduiuskfoab792"
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token from check-auth");
        console.log(token);
        //jwt.verify(token, 'test_secret_key');
        //const decodedToken = jwt.verify(token, "test_secret_key");
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };

        next();
    } catch (error) {
        res.status(401).json({
        message: "Token Invalid!!"
    });
    }
}
