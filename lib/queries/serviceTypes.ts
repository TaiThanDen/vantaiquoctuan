import { get } from "http";

export const ServiceTypeQueries = {
    getAll: `
        SELECT id, name, create_at
        FROM service_types
        WHERE is_deleted = false
        ORDER BY create_at DESC
        LIMIT $1 OFFSET $2;
    `,
    getAllWithKeyword: `
        SELECT id, name, create_at
        FROM service_types
        WHERE is_deleted = false AND LOWER(name) LIKE $3
        ORDER BY create_at DESC
        LIMIT $1 OFFSET $2;
    `,
    create: `
        INSERT INTO service_types (name) VALUES ($1) RETURNING id, name, create_at, is_deleted;
    `,
    getById: `
        SELECT id, name FROM service_types WHERE id = $1 AND is_deleted = false;
    `,
    update: `
        UPDATE service_types SET name = $2 WHERE id = $1 AND is_deleted = false RETURNING id, name;
    `,
    softDelete: `
        UPDATE service_types SET is_deleted = true WHERE id = $1 RETURNING id, name;
    `
};
