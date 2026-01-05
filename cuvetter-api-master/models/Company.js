// const mongoose = require('mongoose');

// const companySchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     companyName: { type: String, required: true },
//     companyEmail: { type: String, required: true, unique: true },
//     employeeSize: { type: Number, required: true },
//     emailOtp: { type: String, required: false },
//     phoneOtp: { type: String, required: false },
//     otpExpiration: { type: Date, required: true },
//     isEmailVerified: { type: Boolean, default: false },
//     isPhoneVerified: { type: Boolean, default: false },
//     isVerified: { type: Boolean, default: false },
//     refreshToken: { type: String, default: null },
// });

// const Company = mongoose.model('Company', companySchema);

// module.exports = Company;





import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },

    phoneNumber: { type: String, required: true, unique: true },

    companyName: { type: String, required: true, trim: true },

    companyEmail: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        index: true 
    },

    employeeSize: { type: Number, required: true },

    // OTP fields
    emailOtp: String,
    phoneOtp: String,
    otpExpiration: Date,

    // Verification flags
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },

    // Auth
    refreshToken: { type: String, default: null, index: true }

}, { timestamps: true });

export default mongoose.model('Company', companySchema);
