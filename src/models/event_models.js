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


export default {
    create_event,
}