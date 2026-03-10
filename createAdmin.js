import bcrypt from "bcrypt";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "enviol",
  password: "pg12345",
  port: 5432,
});

async function run() {
  const username = process.argv[2];
  const plainPassword = process.argv[3];

  if (!username || !plainPassword) {
    console.log("Usage: node createAdmin.js <username> <password>");
    process.exit(1);
  }

  try {
    const hash = await bcrypt.hash(plainPassword, 10);

    await pool.query(
      "INSERT INTO admin_users (username, password) VALUES ($1, $2)",
      [username, hash]
    );

    console.log("✅ Admin user created successfully");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    process.exit();
  }
}

run();