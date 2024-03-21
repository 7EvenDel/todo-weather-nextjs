import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new MongoClient(
      "mongodb+srv://ovsiichukbohdan:GMR5ic8rEJq63zEQ@todo-weather-db.gjm3nt1.mongodb.net/"
    );
    await client.connect();
    const result = await client
      .db("sample_mflix")
      .collection("users")
      .find({})
      .toArray();
    const data = JSON.stringify(result);

    await client.close();

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();

  const client = new MongoClient(
    "mongodb+srv://ovsiichukbohdan:GMR5ic8rEJq63zEQ@todo-weather-db.gjm3nt1.mongodb.net/"
  );

  try {
    await client.connect();
    await client.db("sample_mflix").collection("users").insertOne(data);
    return new NextResponse("User data successfully sent to DB");
  } finally {
    await client.close();
  }
}
