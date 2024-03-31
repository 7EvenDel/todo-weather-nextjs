"use client";

import {
  BriefcaseBusiness,
  Home,
  GraduationCap,
  CalendarCheck,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const History = () => {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      toast.warning("Couldn't get your tasks from server");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      getAllTasks();
    }
  }, [session]);

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

  const historyTasks = tasks.filter(
    (task) => task.status === "done" || task.status === "deleted"
  );

  return (
    <section className="flex flex-col min-h-screen ">
      <ul className="">
        {historyTasks.map((el, i) => {
          const startDate = new Date(el.dateStart);
          const endDate = new Date(el.dateFinish);
          return (
            <motion.li
              initial={{ opacity: 0, translateX: 1000 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.7, delay: i / 5 }}
              key={i}
              className={
                el.status === "done"
                  ? "w-full mt-4 h-32 bg-white hover:bg-green-50 rounded-full flex items-center gap-8 px-8 drop-shadow"
                  : "w-full mt-4 h-32 bg-white hover:bg-red-50 rounded-full flex items-center gap-8 px-8 drop-shadow"
              }
            >
              {el.category === "personal" ? (
                <Home className="size-10" />
              ) : el.category === "study" ? (
                <GraduationCap className="size-10" />
              ) : (
                <BriefcaseBusiness className="size-10" />
              )}
              <div className="w-44 h-full text-left flex flex-col justify-center gap-2">
                <p className="text-gray-400">
                  Started:{" "}
                  <span className="text-black">
                    {startDate.toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-400">
                  Finished:{" "}
                  <span className="text-black">
                    {el.status === "done"
                      ? endDate.toLocaleDateString()
                      : "[...]"}
                  </span>
                </p>
              </div>
              <div className="w-20 h-full text-left flex flex-col justify-center gap-2">
                <p className="text-gray-400">
                  at <span className="text-black">{el.timeStart}:00</span>
                </p>
                <p className="text-gray-400">
                  at{" "}
                  <span className="text-black">
                    {el.status === "done" ? el.timeFinish : "[...]"}
                  </span>
                </p>
              </div>
              <div className="w-2/3 h-full text-left flex flex-col justify-center gap-2">
                <p className="font-semibold flex gap-2 items-center">
                  {el.status === "done" ? (
                    <CalendarCheck className="size-6 text-green-500" />
                  ) : (
                    <CalendarCheck className="size-6 text-red-500" />
                  )}
                  {el.title}
                  <Badge variant="outline">{el.category}</Badge>
                </p>
                <p className="text-gray-400">{el.description}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
};

export default History;
