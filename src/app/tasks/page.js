"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Check,
  CircleCheck,
  CircleDashed,
  CloudRain,
  RefreshCw,
  StickyNote,
  Thermometer,
  Trash2,
} from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import NewTask from "@/components/NewTask";

const categories = [
  { label: "Personal", value: "personal" },
  { label: "Work", value: "work" },
  { label: "Study", value: "study" },
];

const MyTasks = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const session = useSession();

  const getAllTasks = useCallback(async () => {
    try {
      setLoading(true);
      setCategory("");
      // http://localhost:3000/api/tasks
      // https://todo-weather.vercel.app/api/tasks
      const res = await fetch(
        `https://todo-weather.vercel.app/api/tasks?email=${session.data.user.email}`
      );
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      const data = await res.json();
      setTasks(data.tasks);
      setAllTasks(data.tasks);
      setLoading(false);
    } catch (error) {
      toast.warning("Couldn't get your tasks from server");
      setLoading(false);
    }
  }, [session, setTasks]);

  const setTaskStatus = async (title, status) => {
    try {
      // http://localhost:3000/api/tasks
      // https://todo-weather.vercel.app/api/tasks
      const res = await fetch("https://todo-weather.vercel.app/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.data.user.email,
          title,
          status,
        }),
      });
      console.log(res);

      if (!res.ok) {
        console.log("asdkjlasdjklaklds");

        throw new Error("failed to fetch");
      }
      toast.success("Updated!");
      getAllTasks();
    } catch (error) {
      toast.warning("Couldn't connect the server...");
    }
  };

  const registerBySocial = useCallback(async () => {
    try {
      // http://localhost:3000/api/user
      // https://todo-weather.vercel.app/api/user
      const res = await fetch("https://todo-weather.vercel.app/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...session.data.user, password: "1234" }),
      });
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      console.log("account has been created");
    } catch (error) {
      // console.log("User with this e-mail is already exists");
    }
  }, [session]);

  useEffect(() => {
    if (session.status === "authenticated") {
      registerBySocial();
      getAllTasks();
    }
  }, [session, registerBySocial, getAllTasks]);

  useEffect(() => {
    if (category !== "") {
      setTasks(() => {
        return allTasks.filter((task) => {
          console.log(category, task.category);

          return task.category === category;
        });
      });
    }
  }, [category]);

  if (session.status === "loading" || loading) {
    return (
      <Image
        className="mx-auto mt-40"
        src="/Gear-0.2s-200px.gif"
        width={200}
        height={200}
        alt="Loading..."
      />
    );
  }

  if (session.status === "unauthenticated") {
    return (
      <div className="text-center w-full mt-40">
        <h1 className="text-2xl">Here is nothing we can show you.</h1>
        <p className="text-lg">
          May be you want to{" "}
          <Link href="/auth">
            <Button variant="link" className="p-0 text-lg">
              sign in
            </Button>
          </Link>
          ?
        </p>
      </div>
    );
  }

  if (!loading && session.status !== "loading" && tasks.length === 0) {
    return (
      <div className="text-center w-full mt-40">
        <h1 className="text-2xl">Hey, you have no tasks at all</h1>
        <div className="text-lg flex items-center w-full justify-center mt-2">
          <p className="mr-2">Want to add some? </p>
          <div className="-mt-2">
            <NewTask getAllTasks={getAllTasks} />
          </div>
        </div>
        <Button onClick={() => getAllTasks()} className="mt-6">
          <RefreshCw className="size-5 mr-2" /> Refresh
        </Button>
      </div>
    );
  }

  return (
    <section className="flex flex-col pt-8">
      <Tabs
        defaultValue="day"
        className="flex w-full drop-shadow-lg"
        orientation="vertical"
      >
        <TabsList className="flex flex-col w-40 h-40 p-0 bg-gray-100 rounded-l-xl">
          <div className="mt-64 pt-2">
            <TabsTrigger
              value="day"
              className="text-[14px] mt-2 ml-4 w-36 h-12 rounded-l-xl"
            >
              This day
            </TabsTrigger>
            <TabsTrigger
              value="week"
              className="text-[14px] mt-2 ml-4 w-36 h-12 rounded-l-xl"
            >
              Next week
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="text-[14px] mt-2 ml-4 w-36 h-12 rounded-l-xl"
            >
              All my tasks
            </TabsTrigger>
            <div className="mt-28 flex-col flex h-40 bg-gray-100 rounded-l-xl">
              {categories.map((el) => {
                return (
                  <button
                    key={el.value}
                    onClick={() => {
                      setCategory(el.value),
                        toast.info("Current category: " + el.label);
                    }}
                    className={
                      el.value === category
                        ? "text-[14px] mb-2 h-12 w-36 ml-4 bg-white font-semibold transition duration-100 text-black shadow rounded-l-xl"
                        : "text-[14px] mb-2 h-12 w-36 ml-4 font-semibold transition duration-100 rounded-l-xl"
                    }
                  >
                    {el.label}
                  </button>
                );
              })}
            </div>
          </div>
        </TabsList>
        <TabsContent value="day" className="w-full">
          <Day
            tasks={tasks}
            loading={loading}
            getAllTasks={getAllTasks}
            setTaskStatus={setTaskStatus}
          />
        </TabsContent>
        <TabsContent value="week" className="w-full">
          <Week
            tasks={tasks}
            loading={loading}
            getAllTasks={getAllTasks}
            setTaskStatus={setTaskStatus}
          />
        </TabsContent>
        <TabsContent value="all" className="w-full">
          <All
            tasks={tasks}
            loading={loading}
            getAllTasks={getAllTasks}
            setTaskStatus={setTaskStatus}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

const Day = ({ tasks, loading, getAllTasks, setTaskStatus }) => {
  const today = new Date();
  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dateStart);
    taskDate.setDate(taskDate.getDate());
    const isToday =
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear();
    return isToday;
  });
  const todoTasks = todayTasks.filter((task) => task.status === "todo");
  const inProgressTasks = todayTasks.filter(
    (task) => task.status === "inProgress"
  );
  const doneTasks = todayTasks.filter((task) => task.status === "done");

  return (
    <div className="bg-white w-full -mt-2 min-h-[750px] rounded-r-xl rounded-b-xl p-8">
      <div className="flex justify-between">
        <div className="">
          <p className="">Hello Artur!</p>
          <p className="">We wish you a productive day.</p>
        </div>
        <div className="">
          <p className="">12th January</p>
          <p className="flex items-center">
            Temperature +34
            <Thermometer className="size-5" />
          </p>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <div className="w-80">
          <div className="p-4 bg-gray-50 rounded-xl h-14 flex items-center drop-shadow w-full mb-4 font-semibold flex justify-between">
            <p className="flex items-center">
              <StickyNote className="size-4 mr-2 text-blue-500" /> ToDo
            </p>
            <NewTask getAllTasks={getAllTasks} />
          </div>
          {todoTasks.map((task, i) => {
            return (
              <div
                key={i}
                className="w-full bg-gray-50 drop-shadow rounded-xl min-h-36 p-4 mb-4"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {task.timeStart}:00 - [...]
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p className="w-56 text-sm">{task.description}</p>
                  <CloudRain className="mx-auto px-2 w-10 h-10 flex items-center" />
                  <p className="text-gray-500 h-10 text-sm flex items-center">
                    +12°
                  </p>
                </div>
                <div className="flex justify-end items-end w-full h-10 mt-4 gap-2">
                  <Button
                    variant=""
                    className="hover:bg-green-500 bg-green-600 shadow"
                    size="icon"
                    onClick={() => setTaskStatus(task.title, "done")}
                  >
                    <Check className="size-6 " />
                  </Button>
                  <Button
                    variant="secondary"
                    className="hover:bg-yellow-400 bg-yellow-500 shadow"
                    onClick={() => setTaskStatus(task.title, "inProgress")}
                    size="icon"
                  >
                    <CircleDashed className="size-6 text-white" />
                  </Button>
                  <Button
                    variant="destructive"
                    className="shadow"
                    size="icon"
                    onClick={() => setTaskStatus(task.title, "deleted")}
                  >
                    <Trash2 className="size-6 " />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-80">
          <div className="p-4 flex bg-gray-50 items-center rounded-xl drop-shadow w-full mb-4 font-semibold justify-between">
            <p className="flex items-center">
              <CircleDashed className="size-4 mr-2 text-yellow-500" /> In
              progress
            </p>
          </div>
          {inProgressTasks.map((task, i) => {
            return (
              <div
                key={i}
                className="w-full bg-gray-50 drop-shadow rounded-xl min-h-36 p-4 mb-4"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {task.timeStart}:00 - [...]
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p className="w-56 text-sm">{task.description}</p>
                  <CloudRain className="mx-auto px-2 w-10 h-10 flex items-center" />
                  <p className="text-gray-500 h-10 text-sm flex items-center">
                    +12°
                  </p>
                </div>
                <div className="flex justify-end items-end w-full h-10 mt-4 gap-2">
                  <Button
                    variant=""
                    className="hover:bg-green-500 bg-green-600 shadow"
                    size="icon"
                    onClick={() => setTaskStatus(task.title, "done")}
                  >
                    <Check className="size-6 " />
                  </Button>
                  <Button
                    variant="secondary"
                    className="hover:bg-yellow-400 bg-yellow-500 shadow"
                    size="icon"
                    disabled
                  >
                    <CircleDashed className="size-6 text-white" />
                  </Button>
                  <Button
                    variant="destructive"
                    className="shadow"
                    size="icon"
                    onClick={() => setTaskStatus(task.title, "deleted")}
                  >
                    <Trash2 className="size-6 " />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-80">
          <div className="p-4 bg-gray-50 rounded-xl drop-shadow items-center flex w-full mb-4 font-semibold justify-between">
            <p className="flex items-center">
              <CircleCheck className="size-4 mr-2 text-green-500" /> Done
            </p>
          </div>
          {doneTasks.map((task, i) => {
            return (
              <div
                key={i}
                className="w-full bg-gray-50 drop-shadow rounded-xl min-h-36 p-4 mb-4"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {task.timeStart}:00 - {task?.timeFinish}
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p className="w-56 text-sm">{task.description}</p>
                  <CloudRain className="mx-auto px-2 w-10 h-10 flex items-center" />
                  <p className="text-gray-500 h-10 text-sm flex items-center">
                    +12°
                  </p>
                </div>
                <div className="flex justify-end items-end w-full h-10 mt-4 gap-2">
                  <Button
                    variant=""
                    className="bg-green-600 shadow"
                    size="icon"
                    disabled
                  >
                    <Check className="size-6 " />
                  </Button>
                  <Button
                    variant="secondary"
                    className="hover:bg-yellow-400 bg-yellow-500 shadow"
                    onClick={() => setTaskStatus(task.title, "inProgress")}
                    size="icon"
                  >
                    <CircleDashed className="size-6 text-white" />
                  </Button>
                  <Button
                    variant="destructive"
                    className="shadow"
                    size="icon"
                    onClick={() => setTaskStatus(task.title, "deleted")}
                  >
                    <Trash2 className="size-6 " />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Week = ({ tasks, getAllTasks, setTaskStatus }) => {
  const currentDate = new Date();
  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(currentDate.getDate() + 7);

  const daysOfWeek = [];
  const oneDay = 24 * 60 * 60 * 1000;
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.getTime() + i * oneDay);
    daysOfWeek.push(date);
  }

  return (
    <ScrollArea className="bg-white -mt-2 min-h-[750px] rounded-r-xl w-[1176px] rounded-b-xl p-8">
      <div className="flex justify-between gap-16">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="w-80">
            <div className="p-4 bg-gray-50 rounded-xl flex items-center drop-shadow w-full mb-4 font-semibold justify-between">
              <p className="flex items-center">
                <Calendar className="size-4 mr-2 " />
                {day.toLocaleDateString()}
              </p>
              <NewTask getAllTasks={getAllTasks} />
            </div>
            {tasks
              .filter(
                (task) =>
                  new Date(task.dateStart).toLocaleDateString() ===
                    day.toLocaleDateString() && task.status !== "deleted"
              )
              .map((task, i) => (
                <TaskItem key={i} task={task} setTaskStatus={setTaskStatus} />
              ))}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const TaskItem = ({ task, setTaskStatus }) => {
  const startDate = new Date(task.dateStart);
  const endDate = new Date(task.dateFinish);

  return (
    <div className="w-full bg-gray-50 drop-shadow rounded-xl min-h-36 p-4 mb-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-gray-500 text-sm">
          {startDate.toLocaleDateString()} -{" "}
          {task.status === "done" ? endDate.toLocaleDateString() : "[...]"}
        </p>
      </div>
      <div className="flex justify-between ">
        <p className="w-56 text-sm">{task.description}</p>
        <CloudRain className="mx-auto px-2 w-10 h-10 flex items-center" />
        <p className="text-gray-500 h-10 text-sm flex items-center">+12°</p>
      </div>
      <div className="flex justify-end items-end w-full h-10 mt-4 gap-2">
        <Button
          variant=""
          className="hover:bg-green-500 bg-green-600 shadow"
          disabled={task.status === "done"}
          onClick={() => setTaskStatus(task.title, "done")}
          size="icon"
        >
          <Check className="size-6 " />
        </Button>
        <Button
          variant="secondary"
          className="hover:bg-yellow-400 bg-yellow-500 shadow"
          size="icon"
          onClick={() => setTaskStatus(task.title, "inProgress")}
          disabled={task.status === "inProgress"}
        >
          <CircleDashed className="size-6 text-white" />
        </Button>
        <Button
          variant="destructive"
          className="shadow"
          size="icon"
          onClick={() => setTaskStatus(task.title, "deleted")}
        >
          <Trash2 className="size-6 " />
        </Button>
      </div>
    </div>
  );
};

const All = ({ tasks, setTaskStatus }) => {
  const allTasks = tasks.filter(
    (task) => task.status === "todo" || task.status === "inProgress"
  );
  return (
    <div className="bg-white w-full flex flex-wrap justify-center -mt-2 min-h-[750px] rounded-r-xl rounded-b-xl p-8 space-x-8">
      {allTasks.map((task, i) => {
        const todo = task.status === "todo" ? true : false;
        return (
          <div
            key={i}
            className="w-80 bg-gray-50 drop-shadow rounded-xl h-48 p-4 mb-4"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-gray-500 text-sm">
                {task.timeStart}:00 - [...]
              </p>
            </div>
            <div className="flex justify-between h-20">
              <p className="w-56 text-sm">{task.description}</p>
              <CloudRain className="mx-auto px-2 w-10 h-10 flex items-center" />
              <p className="text-gray-500 h-10 text-sm flex items-center">
                +12°
              </p>
            </div>
            <div className="flex justify-end items-end w-full h-10 mt-4 gap-2">
              <Button
                variant=""
                className="hover:bg-green-500 bg-green-600 shadow"
                size="icon"
                onClick={() => setTaskStatus(task.title, "done")}
              >
                <Check className="size-6 " />
              </Button>
              <Button
                variant="secondary"
                className="hover:bg-yellow-400 bg-yellow-500 shadow"
                size="icon"
                disabled={!todo}
                onClick={() => setTaskStatus(task.title, "inProgress")}
              >
                <CircleDashed className="size-6 text-white" />
              </Button>
              <Button
                variant="destructive"
                className="shadow"
                size="icon"
                onClick={() => setTaskStatus(task.title, "deleted")}
              >
                <Trash2 className="size-6 " />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyTasks;
