// const jwt = require('jsonwebtoken');

// function authenticate(req, res, next) {
//     const token = req.headers.authorization?.split(" ")[1];
    
//     if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.companyId = decoded.companyId;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// }

// module.exports = authenticate;






import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.companyId = decoded.companyId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}
