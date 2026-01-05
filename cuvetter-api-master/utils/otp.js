// const nodemailer = require('nodemailer');
// const { Vonage } = require('@vonage/server-sdk');

// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     host: "aamir.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// const vonage = new Vonage({
//     apiKey: process.env.VONAGE_API_KEY,
//     apiSecret: process.env.VONAGE_API_SECRET,
// });

// const sendEmail = async (companyEmail, emailOtp) => {
//     await new Promise((resolve, reject) => {
//         transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: companyEmail,
//             subject: 'Your OTP for Verification',
//             text: `Your email verification OTP is: ${emailOtp}`,
//         }, (err, info) => {
//             if (err) {
//                 console.log('There was an error sending the email.');
//                 console.error(err);
//                 reject(err);
//             } else {
//                 console.log('Email sent successfully');
//                 console.log(info);
//                 resolve(info);
//             }
//         })
//     })
// };

// const sendJobEmail = async (emailOptions) => {
//     try {
//         await transporter.sendMail(emailOptions);
//         console.log('Job Email sent successfully');
//     } catch (err) {
//         console.log('There was an error sending the Job email.');
//         console.error(err);
//     }
// };

// const sendSms = async (phoneNumber, phoneOtp) => {
//     try {
//         const response = await vonage.sms.send({
//             to: phoneNumber,
//             from: 'Cuvette',
//             text: `Your phone verification OTP is: ${phoneOtp}`,
//         });
//         console.log('Message sent successfully');
//         console.log(response);
//     } catch (err) {
//         console.log('There was an error sending the messages.');
//         console.error(err);
//     }
// };

// module.exports = { sendEmail, sendSms, sendJobEmail };







import nodemailer from 'nodemailer';
import { Vonage } from '@vonage/server-sdk';

/* ================= EMAIL ================= */

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendEmail(to, otp) {
    await transporter.sendMail({
        from: `"Cuvette" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Your OTP for Verification',
        text: `Your verification OTP is: ${otp}`
    });
}

export async function sendJobEmail(options) {
    await transporter.sendMail(options);
}

/* ================= SMS ================= */

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
});

export async function sendSms(phone, otp) {
    await vonage.sms.send({
        to: phone,
        from: 'Cuvette',
        text: `Your verification OTP is: ${otp}`
    });
}
