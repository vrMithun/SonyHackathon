import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  // Send login request to Django backend
  const response = await fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  // If authentication fails, return error response
  if (!response.ok) {
    return NextResponse.json({ message: "Login failed", error: responseData }, { status: 401 });
  }

  // Return the actual token from Django if login is successful
  return NextResponse.json({ message: "Login successful", token: responseData });
}
