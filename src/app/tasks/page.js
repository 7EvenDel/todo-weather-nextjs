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
import { motion } from "framer-motion";

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
  const [weatherData, setWeatherData] = useState([]);

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

  const fetchWeatherData = async () => {
    const apiKey = "ddd15989a3070c6066643bfde289965b";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=kyiv&appid=${apiKey}`;
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        toast.warning("Could not find this location");
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      let weather = [];
      for (let i = 0; i <= 40; i += 6) {
        weather.push(data.list[i]);
      }
      setWeatherData(weather);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

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

      if (!res.ok) {
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
    } catch (error) {}
  }, [session]);

  useEffect(() => {
    fetchWeatherData();
    if (session.status === "authenticated") {
      registerBySocial();
      getAllTasks();
    }
  }, [session, registerBySocial, getAllTasks]);

  useEffect(() => {
    if (category !== "") {
      setTasks(() => {
        return allTasks.filter((task) => {
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
      <motion.div
        className="text-center w-full mt-40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
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
              {categories.map((el, i) => {
                return (
                  <motion.button
                    key={el.value}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: i / 2 }}
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
                  </motion.button>
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
            weatherData={weatherData[0]}
          />
        </TabsContent>
        <TabsContent value="week" className="w-full">
          <Week
            tasks={tasks}
            loading={loading}
            getAllTasks={getAllTasks}
            setTaskStatus={setTaskStatus}
            weatherData={weatherData}
          />
        </TabsContent>
        <TabsContent value="all" className="w-full">
          <All
            tasks={tasks}
            loading={loading}
            getAllTasks={getAllTasks}
            setTaskStatus={setTaskStatus}
            weatherData={weatherData}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

const Day = ({ tasks, weatherData, getAllTasks, setTaskStatus }) => {
  const session = useSession();
  const today = new Date();
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dateStart);
    taskDate.setDate(taskDate.getDate());
    const isToday =
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear() &&
      task.status !== "deleted";
    return isToday;
  });
  const todoTasks = todayTasks.filter((task) => task.status === "todo");
  const inProgressTasks = todayTasks.filter(
    (task) => task.status === "inProgress"
  );
  const doneTasks = todayTasks.filter((task) => task.status === "done");

  if (todayTasks.length < 1) {
    return (
      <div className="bg-white w-full -mt-2 min-h-[750px] rounded-r-xl rounded-b-xl p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl">You have no tasks for today</h2>
        <div className="flex items-center">
          <p className="mt-1 mr-1">Want to add some?</p>
          <NewTask getAllTasks={getAllTasks} />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white w-full -mt-2 min-h-[750px] rounded-r-xl rounded-b-xl p-8">
      <div className="flex justify-between">
        <div className="">
          <p className="">Hello, {session?.data.user.name}!</p>
          <p className="">We wish you a productive day.</p>
        </div>
        <div className="">
          <p className="">
            {monthsOfYear[today.getMonth()]} {today.getDate()}
          </p>
          <p className="flex items-center">
            Temperature {(weatherData.main.temp - 273.15).toFixed(1)}°C
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
              <motion.div
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5, delay: i / 2 }}
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
                  <img
                    alt={weatherData.weather[0].main}
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    className="size-14 -my-2"
                  />
                  <p className="text-gray-500 h-10 text-sm flex items-center">
                    {(weatherData.main.temp - 273.15).toFixed(1)}°C
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
              </motion.div>
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
              <motion.div
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5, delay: i / 2 }}
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
                  <img
                    alt={weatherData.weather[0].main}
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    className="size-14 -my-2"
                  />
                  <p className="text-gray-500 h-10 text-sm flex items-center">
                    {(weatherData.main.temp - 273.15).toFixed(1)}°C
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
              </motion.div>
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
              <motion.div
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5, delay: i / 2 }}
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
                  <img
                    alt={weatherData.weather[0].main}
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    className="size-14 -my-2"
                  />
                  <p className="text-gray-500 h-10 text-sm flex items-center">
                    {(weatherData.main.temp - 273.15).toFixed(1)}°C
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Week = ({ tasks, getAllTasks, setTaskStatus, weatherData }) => {
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, translateY: 100 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.5, delay: i / 2 }}
                >
                  <TaskItem
                    task={task}
                    setTaskStatus={setTaskStatus}
                    weatherData={weatherData[index]}
                  />
                </motion.div>
              ))}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const TaskItem = ({ task, setTaskStatus, weatherData }) => {
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
        <img
          alt={weatherData.weather[0].main}
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          className="size-14 -my-2"
        />
        <p className="text-gray-500 h-10 text-sm flex items-center">
          {(weatherData.main.temp - 273.15).toFixed(1)}°C
        </p>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i / 5 }}
            key={i}
            className={
              todo
                ? "w-80 bg-blue-50 drop-shadow rounded-xl h-40 p-4"
                : "w-80 bg-yellow-50 drop-shadow rounded-xl h-40 p-4"
            }
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-gray-500 text-sm">
                {task.timeStart}:00 - [...]
              </p>
            </div>
            <div className="flex justify-between h-20">
              <p className="w-56 text-sm">{task.description}</p>
              <p className="text-gray-500 h-10 text-sm flex items-center">
                {todo ? "To Do" : "In progress"}
              </p>
            </div>
            <div className="flex justify-end items-end w-full h-10 -mt-4 gap-2">
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
          </motion.div>
        );
      })}
    </div>
  );
};

export default MyTasks;
