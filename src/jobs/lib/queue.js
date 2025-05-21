import Queue from 'bull';
import { client } from '../../database/redis.js';
import * as jobs from '../index.js';
import logger from '../../utils/logger.config.js';

// Transformar os jobs em um array de objetos de fila
const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, client, {
        attempts: 5,               // Número de tentativas
        backoff: {
            type: 'exponential',   // Tipo de backoff
            delay: 1000            // Delay inicial em ms
        },
    }),
    name: job.key,
    handle: job.handle,
    
}));

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