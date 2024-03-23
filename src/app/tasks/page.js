"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Thermometer } from "lucide-react";
import { Separator } from "../../components/ui/separator";

const MyTasks = () => {
  const [category, setCategory] = useState("Personal");
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
          <p className="p-4 bg-gray-50 rounded-xl drop-shadow w-full">ToDo</p>
        </div>
        <div className="w-80">
          <p className="p-4 bg-gray-50 rounded-xl drop-shadow w-full">
            In progress
          </p>
        </div>
        <div className="w-80">
          <p className="p-4 bg-gray-50 rounded-xl drop-shadow w-full">Done</p>
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
