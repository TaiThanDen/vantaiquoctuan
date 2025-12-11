import { get } from "http";

export const TrucksServiceTypesQueries = {
    getAllByTruckId: `
        SELECT tst.*, st.name AS service_type_name
        FROM truck_service_types tst
        JOIN service_types st ON tst.service_type_id = st.id
        WHERE tst.truck_id = $1
        ORDER BY tst.created_at DESC;
    `,

    insert: `
        INSERT INTO truck_service_types (
         id, truck_id, service_type_id, created_at
        )
        VALUES (uuid_generate_v4(), $1, $2, NOW())
        RETURNING *;
    `,
    getAll: `
        SELECT 
            tst.*,
            st.name AS service_type_name
        FROM truck_service_types tst
        JOIN service_types st ON tst.service_type_id = st.id
        ORDER BY tst.created_at DESC;
    `,
};