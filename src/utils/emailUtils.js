import logger from './logger.config.js';
import CustomError from './CustomError.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import codeHtml from '../templates/code_template.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: true,
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



export { transporter };