import Queue from 'bull';
import * as jobs from '../index.js';
import logger from '../../utils/logger.config.js';

const redisConfig = process.env.REDIS_URL;

// Transformar os jobs em um array de objetos de fila
const queues = Object.values(jobs).map(job => {
    logger.info(`Creating queue: ${job.key}`);
    const bullQueue = new Queue(job.key, redisConfig, {
        defaultJobOptions: {
            removeOnComplete: true, // Remove jobs concluídos
            removeOnFail: true,      // Remove jobs falhados
            attempts: 5,               // Número de tentativas
            backoff: {
                type: 'exponential',   // Tipo de backoff
                delay: 1000            // Delay inicial em ms
            },
            timeout: 60000, // Tempo limite para o job em ms
        }
    });
    
    bullQueue.on('error', (error) => {
        logger.error(`Queue error: ${job.key} - ${error.message}`);
    });

    bullQueue.isReady().then(() => {
        logger.info(`Bull queue ${job.key} is ready and connected to Redis.`);
    }).catch((error) => {
        logger.error(`Bull queue ${job.key} failed to connect to Redis:`, error);
    });

    return {
        name: job.key,
        bull: bullQueue,
        handle: job.handle
    };  
});

export default {
    queues,
    
    // Adicionar um job à fila correspondente
    add(jobName, data, options = {}) {
        const queue = this.queues.find(queue => queue.name === jobName);
        
        if (!queue) {
            logger.error(`Queue ${jobName} not found`);
            throw new Error(`Queue ${jobName} not found`);
        }
        
        logger.info(`Adding job to queue: ${jobName}`);
        return queue.bull.add(data, options);
    },
    
    // Processar todos os jobs nas filas
    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);
            
            // Eventos para monitoramento
            queue.bull.on('completed', (job, result) => {
                logger.info(`Job completed: ${queue.name}, Job ID: ${job.id}`);
                
            });
            
            queue.bull.on('failed', (job, err) => {
                logger.error(`Job failed: ${queue.name}, Job ID: ${job.id} - Error: ${err}`);
            });
            
            queue.bull.on('stalled', (job) => {
                logger.warn(`Job stalled: ${queue.name}, Job ID: ${job.id}`);
            });
        });
    },
    
    // Obter estatísticas das filas
    async getStats() {
        const stats = [];
        
        for (const queue of this.queues) {
            const counts = await queue.bull.getJobCounts();
            stats.push({
                name: queue.name,
                counts
            });
        }
        
        return stats;
    }
};