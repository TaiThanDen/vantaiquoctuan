export const OrderQueries = {
  getAll: `
  SELECT 
    o.*,
    st.name AS service_type_name,
    t.name AS truck_name,
    t.models AS truck_model,
    t.load AS truck_load,
    t.load_unit AS truck_load_unit,
    t.license_plate AS truck_license_plate
  FROM orders o
  LEFT JOIN service_types st ON o.service_type_id = st.id
  LEFT JOIN trucks t ON o.truck_id = t.id
  ORDER BY o.create_at DESC
`,

  getById: `
    SELECT 
      o.*,
      st.name AS service_type_name,
      t.name AS truck_name,
      t.models AS truck_model,
      t.load AS truck_load,
      t.load_unit AS truck_load_unit,
      t.license_plate AS truck_license_plate
    FROM orders o
    LEFT JOIN service_types st ON o.service_type_id = st.id
    LEFT JOIN trucks t ON o.truck_id = t.id
    WHERE o.id = $1
    LIMIT 1;
  `,

  insert: `
    INSERT INTO orders (
      customer_name, customer_phone, service_type_id,
      weight, weight_unit, from_location, to_location,
      status, create_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
  `,

  update: `
    UPDATE orders
    SET
      customer_name = $1,
      customer_phone = $2,
      service_type_id = $3,
      truck_id = $4,
      weight = $5,
      weight_unit = $6,
      from_location = $7,
      to_location = $8,
      duration = $9,
      status = $10
    WHERE id = $11  
    RETURNING *;
  `,
  delete: `
    DELETE FROM orders
    WHERE id = $1
      RETURNING *;
  `,
  create:
    `
    INSERT INTO orders (
      customer_name, customer_phone, service_type_id,truck_id,
      weight, weight_unit, from_location, to_location, duration,
      status, create_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *;
  `,
};