const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        const error = new Error('Not Authenticated')
        error.status = 401;
        if (!authHeader)
            throw error;
        const token = authHeader.split(' ')[1];
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken)
            throw error;
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        next(error);
    }
}