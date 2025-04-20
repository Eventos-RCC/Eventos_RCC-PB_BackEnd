import logger from './logger.config.js';
import CustomError from './CustomError.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import codeHtml from '../templates/code_template.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP connection successful');
    }
});

const sendMail = async ({ to, subject, text, html }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info('Email sent: ', info.response);
    } catch (error) {
        logger.error('Error sending email: ', error.message);
        throw new Error(`Error sending email: ${error.message}`);
    }
};

const sendCodeToEmail = async (email, code) => {
    logger.info('Sending verification code to email');
    const subject = 'Verification Code';
    const text = `Your verification code is: ${code}`;
    const html = codeHtml(code);
    
    try {
        await sendMail({ to: email, subject, text, html });
        logger.info('Verification code sent to email');
    } catch (error) {
        logger.error('Error sending verification code to email: ', error);
        throw new CustomError('Error sending verification code to email', 500);
    }
};


export default { sendMail, sendCodeToEmail };