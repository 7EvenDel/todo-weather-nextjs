import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const data = await request.json();

    const client = new MongoClient(
      "mongodb+srv://ovsiichukbohdan:GMR5ic8rEJq63zEQ@todo-weather-db.gjm3nt1.mongodb.net/"
    );
    await client.connect();

    const user = await client
      .db("todo-weather")
      .collection("users")
      .findOne({ email: data.email });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const tasks = user.tasks;

    await client.close();

    return new Response(tasks, {
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

    await client
      .db("todo-weather")
      .collection("users")
      .updateOne({ email: data.email }, { $push: { tasks: data.task } });

    console.log(similarUser, "added");

    return new NextResponse("Task data successfully sent to DB");
  } catch {
    console.log(data.task, "was not added");
    return new Error("Could not add the task to DB");
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

    await client
      .db("todo-weather")
      .collection("users")
      .updateOne(
        { email: data.email, "tasks.id": data.task.id },
        { $set: { "tasks.$.status": data.task.status } }
      );

    console.log(similarUser, "added");

    return new NextResponse("Task data successfully sent to DB");
  } catch {
    console.log(data.task, "was not added");
    return new Error("Could not add the task to DB");
  } finally {
    await client.close();
  }
}

export async function DELETE(request) {
  const data = await request.json();

  const client = new MongoClient(
    "mongodb+srv://ovsiichukbohdan:GMR5ic8rEJq63zEQ@todo-weather-db.gjm3nt1.mongodb.net/"
  );

  try {
    await client.connect();

    await client
      .db("todo-weather")
      .collection("users")
      .updateOne(
        { email: data.email },
        { $pull: { tasks: { id: data.taskId } } } // Видаляємо таску з масиву tasks за її ідентифікатором
      );

    // Повертаємо успішний відгук
    return {
      status: 200,
      body: JSON.stringify({ message: "Task deleted successfully" }),
    };
  } catch (error) {
    // Обробляємо помилку
    console.error("Error deleting task:", error);
    // Повертаємо помилку
    return {
      status: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  } finally {
    // Не забуваємо закрити підключення до бази даних
    await client.close();
  }
}
