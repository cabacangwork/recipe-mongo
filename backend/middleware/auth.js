const config = require('config');
const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const token = req.header('auth-token');

    // Check for token
    if(!token) 
        return res.status(401).json({ msg: 'Authorization denied '});

    try {
        // Verify Token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Token not valid' });
    }
}

module.exports = auth;