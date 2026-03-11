import { NextResponse } from "next/server";
import pool from "../../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // 1️⃣ Check if user exists
    const result = await pool.query(
      "SELECT * FROM admin_users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const user = result.rows[0];

    // 2️⃣ Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: "Incorrect username or password" }, { status: 401 });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 4️⃣ Set cookie
    const response = NextResponse.json({ message: "Login successful" });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true, // set true in production
	  sameSite: "lax", 
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}