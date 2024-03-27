import { min } from "date-fns";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    const client = new MongoClient(
      "mongodb+srv://ovsiichukbohdan:GMR5ic8rEJq63zEQ@todo-weather-db.gjm3nt1.mongodb.net/"
    );
    await client.connect();

    const user = await client
      .db("todo-weather")
      .collection("users")
      .findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const response = { tasks: user.tasks };
    await client.close();

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
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

    // console.log(data, "added");

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
        { email: data.email, "tasks.title": data.title },
        { $set: { "tasks.$.status": data.status } }
      );

    if (data.status === "done") {
      const date = new Date();
      const hoursFinish =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minutesFinish =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const timeFinish = hoursFinish + ":" + minutesFinish;

      await client
        .db("todo-weather")
        .collection("users")
        .updateOne(
          { email: data.email, "tasks.title": data.title },
          { $set: { "tasks.$.timeFinish": timeFinish } }
        );
      await client
        .db("todo-weather")
        .collection("users")
        .updateOne(
          { email: data.email, "tasks.title": data.title },
          { $set: { "tasks.$.dateFinish": date } }
        );
    }

    return new NextResponse("Task data successfully sent to DB");
  } catch {
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
