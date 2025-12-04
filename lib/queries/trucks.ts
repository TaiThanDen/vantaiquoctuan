export const TruckQueries = {
  getAll: `
SELECT 
  t.*,

  -- Truck Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', tt.id,
        'name', tt.name,
        'created_at', tt.created_at
      )
    ) FILTER (WHERE tt.id IS NOT NULL),
    '[]'
  ) AS types,

  -- Images
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', ti.id,
        'url', ti.image_url,
        'created_at', ti.created_at
      )
    ) FILTER (WHERE ti.id IS NOT NULL),
    '[]'
  ) AS images,

  -- Service Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', st.id,
        'name', st.name,
        'created_at', st.create_at
      )
    ) FILTER (WHERE st.id IS NOT NULL),
    '[]'
  ) AS service_types

FROM trucks t

LEFT JOIN truck_truck_types ttt ON t.id = ttt.truck_id
LEFT JOIN truck_types tt ON ttt.truck_type_id = tt.id

LEFT JOIN truck_images ti ON t.id = ti.truck_id

LEFT JOIN truck_service_types tst ON t.id = tst.truck_id
LEFT JOIN service_types st ON st.id = tst.service_type_id

GROUP BY t.id
ORDER BY t.created_at DESC;

  `,

  getById: `
SELECT 
  t.*,

  -- Truck Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', tt.id,
        'name', tt.name
      )
    ) FILTER (WHERE tt.id IS NOT NULL),
    '[]'
  ) AS truck_types,

  -- Images
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', ti.id,
        'url', ti.image_url
      )
    ) FILTER (WHERE ti.id IS NOT NULL),
    '[]'
  ) AS images,

  -- Service Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', st.id,
        'name', st.name,
        'created_at', st.create_at
      )
    ) FILTER (WHERE st.id IS NOT NULL),
    '[]'
  ) AS service_types

FROM trucks t
LEFT JOIN truck_truck_types ttt ON t.id = ttt.truck_id
LEFT JOIN truck_types tt ON ttt.truck_type_id = tt.id

LEFT JOIN truck_images ti ON t.id = ti.truck_id

LEFT JOIN truck_service_types tst ON t.id = tst.truck_id
LEFT JOIN service_types st ON st.id = tst.service_type_id

WHERE t.id = $1
GROUP BY t.id;`,

  insert: `
INSERT INTO trucks (
  name,slug, models, brand, load, load_unit,
  description, license_plate, year, color,
  owner_name, owner_phone, documents,
  status, registration_expiry, created_at
)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
RETURNING *;
`,

  getBySlug: `
SELECT 
  t.*,

  -- Truck Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', tt.id,
        'name', tt.name,
        'created_at', tt.created_at
      )
    ) FILTER (WHERE tt.id IS NOT NULL),
    '[]'
  ) AS truck_types,

  -- Truck Images
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', ti.id,
        'url', ti.image_url,
        'created_at', ti.created_at
      )
    ) FILTER (WHERE ti.id IS NOT NULL),
    '[]'
  ) AS images,

  -- Service Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', st.id,
        'name', st.name,
        'created_at', st.create_at
      )
    ) FILTER (WHERE st.id IS NOT NULL),
    '[]'
  ) AS service_types

FROM trucks t

LEFT JOIN truck_truck_types ttt 
  ON t.id = ttt.truck_id

LEFT JOIN truck_types tt 
  ON ttt.truck_type_id = tt.id

LEFT JOIN truck_images ti 
  ON t.id = ti.truck_id

LEFT JOIN truck_service_types tst 
  ON t.id = tst.truck_id

LEFT JOIN service_types st 
  ON st.id = tst.service_type_id

WHERE t.slug = $1

GROUP BY t.id

LIMIT 1;
  `,

  getPaged: `
SELECT 
  t.*,

  -- Truck Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', tt.id,
        'name', tt.name,
        'created_at', tt.created_at
      )
    ) FILTER (WHERE tt.id IS NOT NULL),
    '[]'
  ) AS types,

  -- Images
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', ti.id,
        'url', ti.image_url,
        'created_at', ti.created_at
      )
    ) FILTER (WHERE ti.id IS NOT NULL),
    '[]'
  ) AS images,

  -- Service Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', st.id,
        'name', st.name,
        'created_at', st.create_at
      )
    ) FILTER (WHERE st.id IS NOT NULL),
    '[]'
  ) AS service_types

FROM trucks t

LEFT JOIN truck_truck_types ttt ON t.id = ttt.truck_id
LEFT JOIN truck_types tt ON ttt.truck_type_id = tt.id

LEFT JOIN truck_images ti ON t.id = ti.truck_id

LEFT JOIN truck_service_types tst ON t.id = tst.truck_id
LEFT JOIN service_types st ON st.id = tst.service_type_id

GROUP BY t.id
ORDER BY t.created_at DESC
LIMIT $1 OFFSET $2;
`,

  delete: `
DELETE FROM trucks WHERE id = $1 RETURNING *;
`,

  update: `
UPDATE trucks
SET 
  name = $1,
  slug = $2,
  models = $3,
  brand = $4,
  load = $5,
  load_unit = $6,
  description = $7,
  license_plate = $8,
  year = $9,
  color = $10,
  owner_name = $11,
  owner_phone = $12,
  documents = $13,
  status = $14,
  registration_expiry = $15
WHERE id = $16
RETURNING *;
`,

  search: `
SELECT 
  t.*,

  -- Truck Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', tt.id,
        'name', tt.name,
        'created_at', tt.created_at
      )
    ) FILTER (WHERE tt.id IS NOT NULL),
    '[]'
  ) AS types,

  -- Images
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', ti.id,
        'url', ti.image_url,
        'created_at', ti.created_at
      )
    ) FILTER (WHERE ti.id IS NOT NULL),
    '[]'
  ) AS images,

  -- Service Types
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'id', st.id,
        'name', st.name,
        'created_at', st.create_at
      )
    ) FILTER (WHERE st.id IS NOT NULL),
    '[]'
  ) AS service_types

FROM trucks t

LEFT JOIN truck_truck_types ttt ON t.id = ttt.truck_id
LEFT JOIN truck_types tt ON ttt.truck_type_id = tt.id

LEFT JOIN truck_images ti ON t.id = ti.truck_id

LEFT JOIN truck_service_types tst ON t.id = tst.truck_id
LEFT JOIN service_types st ON st.id = tst.service_type_id

WHERE (
  t.name ILIKE $1 OR
  t.models ILIKE $1 OR
  t.brand ILIKE $1 OR
  t.license_plate ILIKE $1
)

GROUP BY t.id
ORDER BY t.created_at DESC
LIMIT $2 OFFSET $3;
`,

};
