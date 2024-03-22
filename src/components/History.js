import {
  BriefcaseBusiness,
  Home,
  GraduationCap,
  CalendarCheck,
} from "lucide-react";
import { Badge } from "./ui/badge";

const historyTasks = [
  {
    title: "Task title",
    dateStart: "12-12-2012",
    dateFinish: "12-12-2024",
    category: "personal",
    timeStart: "12:00",
    timeFinish: "14:00",
    description:
      "Description of the task Description of the task Description of the task Description of the task",
  },
  {
    title: "Task title",
    dateStart: "12-12-2012",
    dateFinish: "12-12-2024",
    category: "work",
    timeStart: "12:00",
    timeFinish: "14:00",
    description:
      "Description of the task Description of the task Description of the task Description of the task",
  },
  {
    title: "Task title",
    dateStart: "12-12-2012",
    dateFinish: "12-12-2024",
    category: "study",
    timeStart: "12:00",
    timeFinish: "14:00",
    description:
      "Description of the task Description of the task Description of the task Description of the task",
  },
  {
    title: "Task title",
    dateStart: "12-12-2012",
    dateFinish: "12-12-2024",
    category: "personal",
    timeStart: "12:00",
    timeFinish: "14:00",
    description:
      "Description of the task Description of the task Description of the task Description of the task",
  },
  {
    title: "Task title",
    dateStart: "12-12-2012",
    dateFinish: "12-12-2024",
    category: "work",
    timeStart: "12:00",
    timeFinish: "14:00",
    description:
      "Description of the task Description of the task Description of the task Description of the task",
  },

];

const History = () => {
  return (
    <section className="flex flex-col min-h-screen ">
      <ul className="">
        {historyTasks.map((el, i) => {
          return (
            <li
              key={i}
              className="w-full mt-4 h-32 bg-white hover:bg-green-50 transition duration-200 rounded-full flex items-center gap-8 px-8 drop-shadow"
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
                  Started: <span className="text-black">{el.dateStart}</span>
                </p>
                <p className="text-gray-400">
                  Finished: <span className="text-black">{el.dateFinish}</span>
                </p>
              </div>
              <div className="w-20 h-full text-left flex flex-col justify-center gap-2">
                <p className="text-gray-400">
                  at <span className="text-black">{el.timeStart}</span>
                </p>
                <p className="text-gray-400">
                  at <span className="text-black">{el.timeFinish}</span>
                </p>
              </div>
              <div className="w-2/3 h-full text-left flex flex-col justify-center gap-2">
                <p className="font-semibold flex gap-2 items-center">
                  <CalendarCheck className="size-6 text-green-500" />
                  {el.title}
                  <Badge variant="outline">{el.category}</Badge>
                </p>
                <p className="text-gray-400">{el.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default History;
