import {database} from '../database/db.js';
import { QueryTypes } from "sequelize";

const create_user = async (registration, name, email, password, phone, birth_date, diocese_id,) => {
    
    try {
        const [result] = await database.query(
            `INSERT INTO public.users (registration_id, username, email, password, phone, birth_date, diocese_id)
            VALUES (:registration, :name, :email, :password, :phone, :birth_date, :diocese_id) RETURNING *`,
            {
                replacements: {
                    registration: registration,
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    birth_date: birth_date,
                    diocese_id: diocese_id
                },
                type: QueryTypes.INSERT
            }
        );
        return result[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
}

const find_user_by_registration_id = async (registration_id) => {
    try {
        const user = await database.query(
            `SELECT * FROM public.users WHERE registration_id = :registration_id`,
            {
                replacements: { registration_id: registration_id },
                type: QueryTypes.SELECT
            }
        );
        
        if (!user || user.length === 0) {
            return null; // User not found
        }

        return user[0];
    } catch (error) {
        console.error('Error finding user by registration ID:', error);
        throw new Error('Error finding user by registration ID');
    }
}

const find_user_by_email = async (email) => {
    const user = await database.query(
        `SELECT * FROM public.users WHERE email = :email`,
        {
            replacements: { email: email },
            type: QueryTypes.SELECT
        }
    );
    return user[0];
}
 
export default {
    create_user, 
    find_user_by_registration_id,
    find_user_by_email
}
