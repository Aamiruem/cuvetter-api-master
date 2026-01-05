// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const Company = require('../models/Company');
// const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
// const { sendEmail, sendSms } = require('../utils/otp');

// const router = express.Router();

// // Register a new company
// router.post('/register', async (req, res) => {
//     const { name, phoneNumber, companyName, companyEmail, employeeSize } = req.body;

//     try {
//         let company = await Company.findOne({ companyEmail });
//         if (company) return res.status(400).json({ message: 'Company already registered, please Login' });

//         const emailOtp = crypto.randomInt(100000, 999999).toString();
//         const phoneOtp = crypto.randomInt(100000, 999999).toString();
//         const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 min

//         company = new Company({
//             name,
//             phoneNumber,
//             companyName,
//             companyEmail,
//             employeeSize,
//             emailOtp,
//             phoneOtp,
//             otpExpiration,
//         });

//         await company.save();

//         sendEmail(companyEmail, emailOtp)
//         sendSms(phoneNumber, phoneOtp);

//         const { emailOtp: _, phoneOtp: __, ...companyData } = company.toObject();
//         res.json({ message: 'Registration successful. Please verify your email and phone number.', companyData });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // Verify Email OTP
// router.post('/verify-email-otp', async (req, res) => {
//     const { companyEmail, emailOtp } = req.body;
//     let accessToken = "";

//     try {
//         const company = await Company.findOne({ companyEmail });
//         if (!company) return res.status(400).json({ message: 'Company not found' });

//         if (company.emailOtp && company.emailOtp !== emailOtp) return res.status(400).json({ message: 'Invalid OTP' });
//         if (company.otpExpiration < new Date()) return res.status(400).json({ message: 'expired OTP' });

        
//         company.isEmailVerified = true;
//         company.emailOtp = "";
//         if (company.isPhoneVerified) {
//             company.isVerified = true;
//             company.refreshToken = generateRefreshToken();
//             accessToken = generateAccessToken(company._id);
//         }

//         await company.save();
//         const { emailOtp: _, phoneOtp: __, ...companyData } = company.toObject();
        
//         res.json({ accessToken, companyData, message: 'Account verified successfully.' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // Verify Phone OTP
// router.post('/verify-phone-otp', async (req, res) => {
//     const { companyEmail, phoneOtp } = req.body;
//     let accessToken = "";
    
//     try {
//         const company = await Company.findOne({ companyEmail });
//         if (!company) return res.status(400).json({ message: 'Company not found' });
        
//         if (company.phoneOtp && company.phoneOtp !== phoneOtp) return res.status(400).json({ message: 'Invalid OTP' });
//         if (company.otpExpiration < new Date()) return res.status(400).json({ message: 'expired OTP' });
        
//         company.isPhoneVerified = true;
//         company.phoneOtp = "";
//         if (company.isEmailVerified) {
//             company.isVerified = true;
//             company.refreshToken = generateRefreshToken();
//             accessToken = generateAccessToken(company._id);
//         }
//         await company.save();
//         const { emailOtp: _, phoneOtp: __, ...companyData } = company.toObject();

//         res.json({ accessToken, companyData, message: 'Account verified successfully.' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // Refresh the JWT token
// router.post('/refresh-token', async (req, res) => {
//     const { refreshToken } = req.body;

//     try {
//         const company = await Company.findOne({ refreshToken });
//         if (!company) return res.status(400).json({ message: 'Company not found' });

//         if (company.refreshToken !== refreshToken) {
//             return res.status(400).json({ message: 'Invalid refresh token' });
//         }

//         const newAccessToken = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         const { emailOtp: _, phoneOtp: __, ...companyData } = company.toObject();

//         res.json({ accessToken: newAccessToken, company: companyData });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // Resend Email OTP
// router.post('/login', async (req, res) => {
//     const { companyEmail } = req.body;
    
//     try {
//         const company = await Company.findOne({ companyEmail });
//         if (!company) return res.status(400).json({ message: 'Company not found' });

//         if (company.otpExpiration > new Date() && company.emailOtp) {
//             const { emailOtp: _, phoneOtp: __, ...companyData } = company.toObject();
//             return res.json({ message: 'OTP already sent', companyData });
//         }

//         if (!company.isPhoneVerified) {
//             company.phoneOtp = crypto.randomInt(100000, 999999).toString(); 
//             sendSms(phoneNumber, phoneOtp);
//         }
        
//         company.isEmailVerified = false
//         company.emailOtp = crypto.randomInt(100000, 999999).toString();
//         company.otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 min
//         await company.save();
        
//         sendEmail(companyEmail, company.emailOtp)

//         const { emailOtp: _, phoneOtp: __, ...companyData } = company.toObject();
//         res.json({ companyData });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;











import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Company from '../models/Company.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';
import { sendEmail, sendSms } from '../utils/otp.js';

const router = express.Router();

/* ================= REGISTER ================= */
router.post('/register', async (req, res) => {
    const { name, phoneNumber, companyName, companyEmail, employeeSize } = req.body;

    try {
        let company = await Company.findOne({ companyEmail });
        if (company) return res.status(400).json({ message: 'Company already registered' });

        const emailOtp = crypto.randomInt(100000, 999999).toString();
        const phoneOtp = crypto.randomInt(100000, 999999).toString();

        company = await Company.create({
            name,
            phoneNumber,
            companyName,
            companyEmail,
            employeeSize,
            emailOtp,
            phoneOtp,
            otpExpiration: Date.now() + 10 * 60 * 1000
        });

        await sendEmail(companyEmail, emailOtp);
        await sendSms(phoneNumber, phoneOtp);

        const { emailOtp: _, phoneOtp: __, ...safeCompany } = company.toObject();

        res.json({ message: 'OTP sent successfully', company: safeCompany });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

/* ================= VERIFY EMAIL OTP ================= */
router.post('/verify-email-otp', async (req, res) => {
    const { companyEmail, emailOtp } = req.body;

    try {
        const company = await Company.findOne({ companyEmail });
        if (!company) return res.status(404).json({ message: 'Company not found' });

        if (company.emailOtp !== emailOtp || company.otpExpiration < Date.now())
            return res.status(400).json({ message: 'Invalid or expired OTP' });

        company.isEmailVerified = true;
        company.emailOtp = '';

        let accessToken = '';
        if (company.isPhoneVerified) {
            company.isVerified = true;
            company.refreshToken = generateRefreshToken(company._id);
            accessToken = generateAccessToken(company._id);
        }

        await company.save();

        const { emailOtp: _, phoneOtp: __, ...safeCompany } = company.toObject();
        res.json({ accessToken, company: safeCompany });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ================= VERIFY PHONE OTP ================= */
router.post('/verify-phone-otp', async (req, res) => {
    const { companyEmail, phoneOtp } = req.body;

    try {
        const company = await Company.findOne({ companyEmail });
        if (!company) return res.status(404).json({ message: 'Company not found' });

        if (company.phoneOtp !== phoneOtp || company.otpExpiration < Date.now())
            return res.status(400).json({ message: 'Invalid or expired OTP' });

        company.isPhoneVerified = true;
        company.phoneOtp = '';

        let accessToken = '';
        if (company.isEmailVerified) {
            company.isVerified = true;
            company.refreshToken = generateRefreshToken(company._id);
            accessToken = generateAccessToken(company._id);
        }

        await company.save();

        const { emailOtp: _, phoneOtp: __, ...safeCompany } = company.toObject();
        res.json({ accessToken, company: safeCompany });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ================= REFRESH TOKEN ================= */
router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const company = await Company.findById(payload.id);
        if (!company || company.refreshToken !== refreshToken)
            return res.status(401).json({ message: 'Invalid refresh token' });

        const newAccessToken = generateAccessToken(company._id);

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(401).json({ message: 'Token expired or invalid' });
    }
});

/* ================= LOGIN ================= */
router.post('/login', async (req, res) => {
    const { companyEmail } = req.body;

    try {
        const company = await Company.findOne({ companyEmail });
        if (!company) return res.status(404).json({ message: 'Company not found' });

        company.emailOtp = crypto.randomInt(100000, 999999).toString();
        company.phoneOtp = crypto.randomInt(100000, 999999).toString();
        company.otpExpiration = Date.now() + 10 * 60 * 1000;

        await company.save();

        await sendEmail(company.companyEmail, company.emailOtp);
        await sendSms(company.phoneNumber, company.phoneOtp);

        res.json({ message: 'OTP sent' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
