import {client} from '../database/redis.js';

const dataSave = async (prefix, key, value, ttl) => {
    await client.SET(`${prefix}:${key}`, JSON.stringify(value));
    await client.EXPIRE(`${prefix}:${key}`, ttl); // 20 minutos
    return true;
};

const getData = async (prefixy, key) => {
    const data = await client.GET(`${prefixy}:${key}`);
    return data ? JSON.parse(data) : null;
};

const delData = async (prefix, key) => {
    await client.DEL(`${prefix}:${key}`);
}


export default { dataSave, getData, delData };