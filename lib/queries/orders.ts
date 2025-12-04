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
    ORDER BY o.create_at DESC;
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
};
