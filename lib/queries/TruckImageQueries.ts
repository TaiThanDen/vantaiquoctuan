export const TruckImageQueries = {
  getAllByTruckId: `
    SELECT *
    FROM truck_images
    WHERE truck_id = $1
    ORDER BY created_at DESC;
  `,

  insert: ` 
INSERT INTO truck_images (
  truck_id, image_url, created_at
)
  VALUES (uuid_generate_v4(), $1, $2, NOW())
    RETURNING *;
`,
};