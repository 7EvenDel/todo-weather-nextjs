import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new MongoClient(
      "mongodb+srv://arturrmartunovskyi:R7tF3vEopPt5H4b2@todo-weather.y95b0t6.mongodb.net/"
    );
    await client.connect();
    const result = await client
      .db("todo-weather")
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
    "mongodb+srv://arturrmartunovskyi:R7tF3vEopPt5H4b2@todo-weather.y95b0t6.mongodb.net/"
  );

  try {
    await client.connect();
    const similarUser = await client
      .db("todo-weather")
      .collection("users")
      .findOne({ email: data.email });

    if (!similarUser) {
      await client
        .db("todo-weather")
        .collection("users")
        .insertOne({
          ...data,
          language: "english",
          date: "ddmmyyyy",
          timeFormat: "24",
          timeZone: "eastEurope",
          country: "ukraine",
          tasks: [],
        });
      return new NextResponse("User data successfully sent to DB");
    } else {

      return new Response("User with this email is already exists", {
        status: 500,
      });
    }
  } finally {
    await client.close();
  }
}
