"use client";

import { CloudRain, Droplet, Search, Thermometer, Wind } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";

const Weather = () => {
  const [location, setLocation] = useState("London");
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);
  const [todayWeather, setTodayWeather] = useState([]);

  const fetchWeatherData = async () => {
    const apiKey = "ddd15989a3070c6066643bfde289965b";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        toast.warning("Could not find this location");
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setLoading(false);
      setLocation(data.city);
      let weather = [];
      for (let i = 0; i <= 40; i += 6) {
        weather.push(data.list[i]);
      }
      console.log(weather);
      setWeatherData(weather);
      setTodayWeather([data.list[0], data.list[1], data.list[2], data.list[3]]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
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
  const today = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <section className="flex flex-col min-h-screen pt-8">
      <div className="flex gap-4 w-full rounded-full bg-white mb-4">
        <div className="w-96 items-center  flex flex-col drop-shadow py-4">
          <p className="text-[32px]">{location.name}</p>
          <p className="text-[18px]">
            {daysOfWeek[today.getDay()]}{" "}
            {today.getHours() < 10
              ? "0" + today.getHours() + ":" + today.getMinutes()
              : today.getHours() + ":" + today.getMinutes()}
          </p>
          <p className="text-[52px]">
            {(weatherData[0].main.temp - 273.15).toFixed(1)}°C
          </p>
        </div>
        <div className="w-full">
          <form className="flex w-full" onSubmit={() => fetchWeatherData()}>
            <Input
              placeholder="Enter your location"
              className="w-[616px] ml-16 my-2 rounded-r-none"
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button type="submit" className="w-[73px] my-2 rounded-l-none">
              <Search />
            </Button>
          </form>
          <div className="flex">
            {todayWeather.map((el, i) => {
              const date = new Date(el.dt_txt);
              return (
                <div key={i} className="items-center flex flex-col w-1/5">
                  <p className="text-[24px]">
                    {date.getHours() < 10
                      ? "0" + date.getHours() + ":00"
                      : date.getHours() + ":00"}
                  </p>
                  <img
                    alt={el.weather[0].main}
                    src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                    className="size-14 -my-2"
                  />
                  <p className="text-[24px]">
                    {(el.main.temp - 273.15).toFixed(1)}°C
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between my-4">
        <div className="items-center flex flex-col">
          <p className="">Chance of Rain</p>
          <p className="font-semibold">{todayWeather[0].pop * 100}%</p>
        </div>
        <div className="items-center flex flex-col">
          <p className="">Humidity</p>
          <p className="font-semibold">{todayWeather[0].main.humidity}%</p>
        </div>
        <div className="items-center flex flex-col">
          <p className="">Wind Speed</p>
          <p className="font-semibold">{todayWeather[0].wind.speed} km/h</p>
        </div>
        <div className="items-center flex flex-col">
          <p className="">Visibility</p>
          <p className="font-semibold">
            {(todayWeather[0].visibility / 1000).toFixed(1)} km
          </p>
        </div>
        <div className="items-center flex flex-col">
          <p className="">Pressure</p>
          <p className="font-semibold">{todayWeather[0].main.pressure} hPa</p>
        </div>
      </div>
      <Separator className="bg-gray-400" />
      <div className="flex flex-wrap w-full justify-center space-x-12">
        {weatherData.map((el, i) => {
          let date = new Date();
          date.setDate(date.getDate() + i);
          return (
            <WeatherCard
              key={i}
              weatherData={el}
              cityName={location.name}
              date={date}
            />
          );
        })}
      </div>
    </section>
  );
};

const WeatherCard = ({ weatherData, cityName, date }) => {
  return (
    <div className="w-[240px] h-[280px] bg-white opacity-90 mt-4 rounded-xl drop-shadow-lg">
      <div className="h-1/2 w-full p-2">
        <h3 className="font-semibold text-center w-full">{cityName}</h3>
        <div className="flex">
          <div className="mx-auto text-center my-3">
            <p className="">{date.toLocaleDateString()}</p>
            <p className="text-xl font-semibold">
              {(weatherData.main.temp_max - 273.15).toFixed(1) ===
              (weatherData.main.temp_min - 273.15).toFixed(1)
                ? (weatherData.main.temp_max - 273.15).toFixed(1) + "°C"
                : (weatherData.main.temp_max - 273.15).toFixed(1) +
                  "°/" +
                  (weatherData.main.temp_min - 273.15).toFixed(1) +
                  "°"}
            </p>
          </div>
        </div>
        <div className="text-center flex items-center justify-center gap-1 -mt-4">
          <img
            alt={weatherData.weather[0].main}
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            className="size-14"
          />
          <p className="">{weatherData.weather[0].main}</p>
        </div>
      </div>
      <Separator className="w-4/5 mx-auto" />
      <div className="h-1/2 p-2">
        <div className="flex justify-between">
          <div className="w-1/2 flex items-center justify-start pl-3 h-[62px]">
            <Wind />
            <div className="">
              <p className="text-[12px] font-semibold">
                {weatherData.wind.speed} km/h
              </p>
              <p className="text-[10px] text-gray-400">Wind</p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-start pl-3 h-[62px]">
            <CloudRain />
            <div className="">
              <p className="text-[12px] font-semibold">
                {weatherData.pop * 100}%
              </p>
              <p className="text-[10px] text-gray-400">Chance of rain</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 flex items-center justify-start pl-3 h-[62px]">
            <Thermometer />
            <div className="">
              <p className="text-[12px] font-semibold">
                {weatherData.main.pressure} mbar
              </p>
              <p className="text-[10px] text-gray-400">Pressure</p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-start pl-3 h-[62px]">
            <Droplet />
            <div className="">
              <p className="text-[12px] font-semibold">
                {weatherData.main.humidity}%
              </p>
              <p className="text-[10px] text-gray-400">Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
