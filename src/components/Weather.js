import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const Weather = () => {
  return (
    <section className="flex flex-col min-h-screen pt-8">
      <div className="flex gap-4 w-full">
        <div className="w-96">
          <p className="">london</p>
          <p className="">sunday</p>
          <p className="">12c</p>
        </div>
        <div className="w-full">
          <div className="flex w-full">
            <Input placeholder="Enter your location" className="w-[530px]" />
            <Button className="w-[73px]">
              <Search />
            </Button>
          </div>
          <div className="flex justify-between">
            <div className="">
              <p className="">08:00</p>
              <p className="">ico</p>
              <p className="">13c</p>
            </div>
            <div className="">
              <p className="">08:00</p>
              <p className="">ico</p>
              <p className="">13c</p>
            </div>
            <div className="">
              <p className="">08:00</p>
              <p className="">ico</p>
              <p className="">13c</p>
            </div>
            <div className="">
              <p className="">08:00</p>
              <p className="">ico</p>
              <p className="">13c</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="">
          <p className="">chance of rain</p>
        </div>
        <div className="">
          <p className="">humidity</p>
        </div>
        <div className="">
          <p className="">wind speed</p>
        </div>
        <div className="">
          <p className="">visibility</p>
        </div>
        <div className="">
          <p className="">pressure</p>
        </div>
      </div>
      <Separator />
    </section>
  );
};

export default Weather;
