export async function GET() {
  const token = cookies().get("admin_token")?.value;

  console.log("Token in /me:", token);

  if (!token) {
    console.log("No token found");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    return NextResponse.json({
      username: decoded.username,
    });
  } catch (err) {
    console.log("JWT verify failed:", err.message);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}