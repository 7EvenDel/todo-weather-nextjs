"use client";

import History from "./History";
import MyTasks from "./MyTasks";
import Weather from "./Weather";

const Main = () => {
  return (
    <div className="container">
      <History />
      <MyTasks />
      <Weather />
    </div>
  );
};

export default Main;
