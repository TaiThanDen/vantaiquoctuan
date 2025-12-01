export const OrderQueries = {
  getAll: `
    SELECT 
      o.*,
      st.name as service_type_name,
      tt.name as truck_type_name
    FROM orders o
    LEFT JOIN service_types st ON o.service_type_id = st.id
    LEFT JOIN truck_types tt ON o.truck_type_id = tt.id
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
