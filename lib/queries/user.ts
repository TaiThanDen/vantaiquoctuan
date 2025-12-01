
export const UserQueries = {
  getAll: "SELECT * FROM users ORDER BY id DESC",
  getById: "SELECT * FROM users WHERE id = $1",
  create:
    "INSERT INTO users (username, password_hash, role, create_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
};