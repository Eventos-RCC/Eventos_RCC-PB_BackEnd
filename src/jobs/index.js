// Exportar todos os jobs disponíveis
import * as EmailJobs from './handlers/EmailJobs.js';
//import * as NotificationJobs from './handlers/NotificationJobs.js';
// Importar outros tipos de jobs...

// Exportar todos os jobs em um único objeto
export const {
    VerificationCodeEmail,
    WelcomeEmail
} = EmailJobs;

// export const {
//     // Jobs de notificação
// } = NotificationJobs;

// Exportar outros jobs...
