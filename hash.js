import bcrypt from "bcrypt";

async function run() {
  const hash = await bcrypt.hash("env_vaibhav", 10);
  console.log(hash);
}

run();