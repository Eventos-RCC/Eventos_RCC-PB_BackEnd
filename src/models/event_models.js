import { database } from "../database/db.js";
import { QueryTypes } from "sequelize";

const create_event = async (name, description, location, diocese_id, start_time, end_time, event_level, master_id) => {

    const result = await database.query(
        `INSERT INTO public.event (name, description, location, diocese_id, start_time, end_time, event_level, master_id)
        VALUES (:name, :description, :location, :diocese_id, :start_time, :end_time, :event_level, :master_id) RETURNING *`,
        {
            replacements: {
                name: name,
                description: description,
                location: location,
                diocese_id: diocese_id,
                start_time: start_time,
                end_time: end_time,
                event_level: event_level,
                master_id: master_id
            },
            type: QueryTypes.INSERT
        }
    );
    return result[0][0];
}

const find_All_events = async () => {
    const response = await database.query(
        `SELECT e.*, d.name AS diocese_name
        FROM public.event e
        JOIN public.diocese d ON e.diocese_id = d.diocese_id
        WHERE isDeleted = false and isArchived = false;`,
        {
            type: QueryTypes.SELECT
        }
    );
    if(!response || response.length === 0) {
        return null; // No events found
    }
    return response;
}

const deleteEvent = async (event_id) => {
    const result = await database.query(
        `UPDATE public.event SET isDeleted = true WHERE event_id = :event_id RETURNING *`,
        {
            replacements: { event_id: event_id },
            type: QueryTypes.UPDATE
        }
    );
    return result[0][0];
}

const find_event_by_id = async (event_id) => {
    const result = await database.query(
        `SELECT * FROM public.event WHERE event_id = :event_id`,
        {
            replacements: { event_id: event_id },
            type: QueryTypes.SELECT
        }
    );
    return result[0];
}


export default {
    create_event,
    find_All_events,
    deleteEvent,
    find_event_by_id
}