export const TruckTruckTypes = {
    getAllByTruckId: `
    SELECT tst.*, st.name AS service_type_name
    FROM truck_service_types tst
    JOIN service_types st ON tst.service_type_id = st.id
    WHERE tst.truck_id = $1
    ORDER BY tst.created_at DESC;
`,

    insert: `
    INSERT INTO truck_types (
     id, name, created_at, is_deleted
    )
    VALUES (uuid_generate_v4(), $1, NOW(), false)
    RETURNING *;
`,
    getAll: `
        SELECT id, name, created_at
        FROM truck_types
        WHERE is_deleted = false
        ORDER BY name ASC
    `,
    delete: `
    DELETE FROM truck_types WHERE id = $1 RETURNING *;
`,
    softDelete: `
        UPDATE truck_types SET is_deleted = true WHERE id = $1 RETURNING *;
    `,
    getById: `
        SELECT id, name, created_at
        FROM truck_types
        WHERE id = $1 AND is_deleted = false;
    `,
    update: `
        UPDATE truck_types
        SET name = $2
        WHERE id = $1 AND is_deleted = false
        RETURNING *;
    `
};