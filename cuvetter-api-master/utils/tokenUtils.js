// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

// function generateAccessToken(companyId) {
//     return jwt.sign({ companyId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// }

// function generateRefreshToken() {
//     return crypto.randomBytes(64).toString('hex');
// }

// module.exports = {
//     generateAccessToken,
//     generateRefreshToken,
// };



import jwt from 'jsonwebtoken';

/* ================= ACCESS TOKEN ================= */
export function generateAccessToken(companyId) {
    return jwt.sign(
        { companyId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

/* ================= REFRESH TOKEN ================= */
export function generateRefreshToken(companyId) {
    return jwt.sign(
        { companyId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
}
