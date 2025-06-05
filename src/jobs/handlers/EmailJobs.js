import {transporter} from '../../utils/emailUtils.js'
import codeHtml from '../../templates/code_template.js';
import logger from '../../utils/logger.config.js';
import CustomError from '../../utils/CustomError.js';

const mailOptions = (email, code) => {
    const subject = 'Verification Code';
    const text = `Your verification code is: ${code}`;
    const html = codeHtml(code);
    
    return { to: email, subject, text, html };
    
};

export const VerificationCodeEmail = {
    key: 'VerificationCodeEmail',
    async handle({ data }) {
        const { email, code } = data;
        try {
            await transporter.sendMail(mailOptions(email, code));
            logger.info('Verification code sent to email');
            return { success: true };
        } catch (error) {
            logger.error('Error sending verification code to email:', error);
            throw new CustomError('Error sending verification code to email', 500);
        }
    }
};

export const WelcomeEmail = {
    key: 'WelcomeEmail',
    async handle({ data }) {
        const { email, name } = data;
        try {
            // Implementação do envio de email de boas-vindas
            // ...
            return { success: true };
        } catch (error) {
            logger.error('Error sending welcome email:', error);
            throw new CustomError('Error sending welcome email', 500);
        }
    }
};