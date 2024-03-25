import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new MongoClient(
      "mongodb+srv://ovsiichukbohdan:GMR5ic8rEJq63zEQ@todo-weather-db.gjm3nt1.mongodb.net/"
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
    "mongodb+srv://ovsiichukbohdan:GMR5ic8rEJq63zEQ@todo-weather-db.gjm3nt1.mongodb.net/"
  );

  try {
    await client.connect();
    const similarUser = await client
      .db("todo-weather")
      .collection("users")
      .findOne({ email: data.email });
    if (!similarUser) {
      console.log(similarUser, "added");
      await client
        .db("todo-weather")
        .collection("users")
        .insertOne({
          ...data,
          language: "english",
          date: "MM/DD/YYYY",
          timeFormat: "24",
          timeZone: "eastEurope",
          country: "ukraine",
          tasks: [],
        });
      return new NextResponse("User data successfully sent to DB");
    } else {
      console.log(similarUser, "did not added");

      return new Error("User with this email is already exists");
    }
  } finally {
    await client.close();
  }
}

export async function PUT(request) {
  const data = await request.json();

  const client = new MongoClient(
    "mongodb+srv://ovsiichukbohdan:GMR5ic8rEJq63zEQ@todo-weather-db.gjm3nt1.mongodb.net/"
  );

  try {
    await client.connect();
    const similarUser = await client
      .db("todo-weather")
      .collection("users")
      .findOne({ email: data.email });
    if (!similarUser) {
      console.log(similarUser, "added");
      await client
        .db("todo-weather")
        .collection("users")
        .insertOne({
          ...data,
          language: "english",
          dateFormat: "MM/DD/YYYY",
          timeFormat: "24",
          timeZone: "eastEurope",
          country: "ukraine",
          tasks: [],
        });
      return new NextResponse("User data successfully sent to DB");
    } else {
      console.log(similarUser, "did not added");

      return new Error("User with this email is already exists");
    }
  } finally {
    await client.close();
  }
}
