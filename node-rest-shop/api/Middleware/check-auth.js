const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }else{
        token = token.split(' ')[1];
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};