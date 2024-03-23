import {
  Cloud,
  CloudRain,
  CloudSun,
  Droplet,
  Search,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

const Weather = () => {
  return (
    <section className="flex flex-col min-h-screen pt-8">
      <div className="flex gap-4 w-full rounded-full bg-white mb-4">
        <div className="w-96 items-center  flex flex-col drop-shadow py-4">
          <p className="text-[32px]">London</p>
          <p className="text-[18px]">Sunday 07:09</p>
          <p className="text-[52px]">12°C</p>
        </div>
        <div className="w-full">
          <div className="flex w-full">
            <Input
              placeholder="Enter your location"
              className="w-[616px] ml-16 my-2 rounded-r-none"
            />
            <Button className="w-[73px] my-2 rounded-l-none">
              <Search />
            </Button>
          </div>
          <div className="flex">
            <div className="items-center flex flex-col w-1/5">
              <p className="text-[24px]">08:00</p>
              <CloudRain className="size-10 text-gray-700" />
              <p className="text-[24px]">13°C</p>
            </div>
            <div className="items-center flex flex-col w-1/5">
              <p className="text-[24px]">08:00</p>
              <CloudSun className="size-10 text-gray-700" />
              <p className="text-[24px]">13°C</p>
            </div>
            <div className="items-center flex flex-col w-1/5">
              <p className="text-[24px]">08:00</p>
              <Sun className="size-10 text-gray-700" />
              <p className="text-[24px]">13°C</p>
            </div>
            <div className="items-center flex flex-col w-1/5">
              <p className="text-[24px]">08:00</p>
              <Cloud className="size-10 text-gray-700" />
              <p className="text-[24px]">13°C</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between my-4">
        <div className="items-center flex flex-col">
          <p className="">Chance of Rain</p>
          <p className="font-semibold">12%</p>
        </div>
        <div className="items-center flex flex-col">
          <p className="">Humidity</p>
          <p className="font-semibold">60%</p>
        </div>
        <div className="items-center flex flex-col">
          <p className="">Wind Speed</p>
          <p className="font-semibold">10 k/h</p>
        </div>
        <div className="items-center flex flex-col">
          <p className="">Visibility</p>
          <p className="font-semibold">100km</p>
        </div>
        <div className="items-center flex flex-col">
          <p className="">Pressure</p>
          <p className="font-semibold">1015 hPa</p>
        </div>
      </div>
      <Separator className="bg-gray-400" />
      <div className="flex flex-wrap w-full justify-center space-x-12">
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </div>
    </section>
  );
};

const WeatherCard = () => {
  return (
    <div className="w-[240px] h-[280px] bg-white opacity-90 mt-4 rounded-xl drop-shadow-lg">
      <div className="h-1/2 w-full p-2">
        <h3 className="font-semibold text-center w-full">London</h3>
        <div className="flex">
          <div className="mx-auto text-center my-3">
            <p className="">Sunday | Nov 14</p>
            <p className="text-xl font-semibold">-8/12°</p>
          </div>
        </div>
        <div className="text-center flex items-center justify-center gap-1">
          <CloudRain className="" />
          <p className="">Heavy rain</p>
        </div>
      </div>
      <Separator className="w-4/5 mx-auto" />
      <div className="h-1/2 p-2">
        <div className="flex justify-between">
          <div className="w-1/2 flex items-center justify-start pl-3 h-[62px]">
            <Wind />
            <div className="">
              <p className="text-[12px] font-semibold">3.7 km/h</p>
              <p className="text-[10px] text-gray-400">Wind</p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-start pl-3 h-[62px]">
            <CloudRain />
            <div className="">
              <p className="text-[12px] font-semibold">74%</p>
              <p className="text-[10px] text-gray-400">Chance of rain</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 flex items-center justify-start pl-3 h-[62px]">
            <Thermometer />
            <div className="">
              <p className="text-[12px] font-semibold">1010 mbar</p>
              <p className="text-[10px] text-gray-400">Pressure</p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-start pl-3 h-[62px]">
            <Droplet />
            <div className="">
              <p className="text-[12px] font-semibold">83%</p>
              <p className="text-[10px] text-gray-400">Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
