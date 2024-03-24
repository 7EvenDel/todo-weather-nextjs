"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Check,
  CircleCheck,
  CircleDashed,
  CloudRain,
  StickyNote,
  Thermometer,
  Trash2,
} from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const MyTasks = () => {
  const [category, setCategory] = useState("Personal");
  const session = useSession();

  if (session.status === "loading") {
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
              className="text-[14px] mt-2 ml-4 w-36 h-12"
            >
              This day
            </TabsTrigger>
            <TabsTrigger
              value="week"
              className="text-[14px] mt-2 ml-4 w-36 h-12"
            >
              Next week
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="text-[14px] mt-2 ml-4 w-36 h-12"
            >
              All my tasks
            </TabsTrigger>
            <div className="mt-28 flex-col flex h-40 bg-gray-100 rounded-l-xl">
              <button className="text-[14px] mb-2 text-black bg-white h-12 w-36 ml-4">
                button
              </button>
              <button className="text-[14px] mb-2 h-12 w-36 ml-4">
                button
              </button>
              <button className="text-[14px] mb-2 h-12 w-36 ml-4">
                button
              </button>
            </div>
          </div>
        </TabsList>
        <TabsContent value="day" className="w-full">
          <Day />
        </TabsContent>
        <TabsContent value="week" className="w-full">
          <Week />
        </TabsContent>
        <TabsContent value="all" className="w-full">
          <All />
        </TabsContent>
      </Tabs>
    </section>
  );
};

const Day = () => {
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
          <p className="p-4 bg-gray-50 rounded-xl flex items-center drop-shadow w-full mb-4 font-semibold">
            <StickyNote className="size-4 mr-2 text-blue-500" /> ToDo
          </p>
          <div className="w-full bg-gray-50 drop-shadow rounded-xl min-h-36 p-4 mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Task title</h3>
              <p className="text-gray-500 text-sm">07:09 - 08:23</p>
            </div>
            <div className="flex justify-between ">
              <p className="w-56 text-sm">
                Task description Task description Task description
              </p>
              <CloudRain className="mx-auto px-2 w-10 h-10 flex items-center" />
              <p className="text-gray-500 h-10 text-sm flex items-center">
                +12°
              </p>
            </div>
            <div className="flex justify-end items-end w-full h-10 mt-4 gap-2">
              <Button variant="" className="bg-green-600 shadow" size="icon">
                <Check className="size-6 " />
              </Button>
              <Button
                variant="secondary"
                className="bg-yellow-500 shadow"
                size="icon"
              >
                <CircleDashed className="size-6 text-white" />
              </Button>
              <Button variant="destructive" className="shadow" size="icon">
                <Trash2 className="size-6 " />
              </Button>
            </div>
          </div>
        </div>
        <div className="w-80">
          <p className="p-4 flex bg-gray-50 items-center rounded-xl drop-shadow w-full mb-4 font-semibold">
            <CircleDashed className="size-4 mr-2 text-yellow-500" /> In progress
          </p>
          <div className="w-full bg-gray-50 drop-shadow rounded-xl min-h-36 p-4 mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Task title</h3>
              <p className="text-gray-500 text-sm">07:09 - 08:23</p>
            </div>
            <div className="flex justify-between ">
              <p className="w-56 text-sm">
                Task description Task description Task description Task
                description Task description
              </p>
              <CloudRain className="mx-auto px-2 w-10 h-10 flex items-center" />
              <p className="text-gray-500 h-10 text-sm flex items-center">
                +12°
              </p>
            </div>
            <div className="flex justify-end items-end w-full h-10 mt-4 gap-2">
              <Button variant="" className="bg-green-600 shadow" size="icon">
                <Check className="size-6 " />
              </Button>
              <Button
                variant="secondary"
                className="bg-yellow-500 shadow"
                size="icon"
                disabled
              >
                <CircleDashed className="size-6 text-white" disa />
              </Button>
              <Button variant="destructive" className="shadow" size="icon">
                <Trash2 className="size-6 " />
              </Button>
            </div>
          </div>
          <div className="w-full bg-gray-50 drop-shadow rounded-xl min-h-36 p-4 mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Task title</h3>
              <p className="text-gray-500 text-sm">07:09 - 08:23</p>
            </div>
            <div className="flex justify-between ">
              <p className="w-56 text-sm">
                Task description Task description Task description Task
                description Task description
              </p>
              <CloudRain className="mx-auto px-2 w-10 h-10 flex items-center" />
              <p className="text-gray-500 h-10 text-sm flex items-center">
                +12°
              </p>
            </div>
            <div className="flex justify-end items-end w-full h-10 mt-4 gap-2">
              <Button variant="" className="bg-green-600 shadow" size="icon">
                <Check className="size-6 " />
              </Button>
              <Button
                variant="secondary"
                className="bg-yellow-500 shadow"
                size="icon"
                disabled
              >
                <CircleDashed className="size-6 text-white" disa />
              </Button>
              <Button variant="destructive" className="shadow" size="icon">
                <Trash2 className="size-6 " />
              </Button>
            </div>
          </div>
        </div>
        <div className="w-80">
          <p className="p-4 bg-gray-50 rounded-xl drop-shadow items-center flex w-full mb-4 font-semibold">
            <CircleCheck className="size-4 mr-2 text-green-500" /> Done
          </p>
          <div className="w-full bg-gray-50 drop-shadow rounded-xl min-h-36 p-4 mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Task title</h3>
              <p className="text-gray-500 text-sm">07:09 - 08:23</p>
            </div>
            <div className="flex justify-between ">
              <p className="w-56 text-sm">Task description</p>
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
                className="bg-yellow-500 shadow"
                size="icon"
              >
                <CircleDashed className="size-6 text-white" />
              </Button>
              <Button variant="destructive" className="shadow" size="icon">
                <Trash2 className="size-6 " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Week = () => {
  return (
    <div className="bg-white w-full -mt-2 min-h-[750px] rounded-r-xl rounded-b-xl p-8">
      next week
    </div>
  );
};

const All = () => {
  return (
    <div className="bg-white w-full -mt-2 min-h-[750px] rounded-r-xl rounded-b-xl p-8">
      all tasks
    </div>
  );
};

export default MyTasks;
