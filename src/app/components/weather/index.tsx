'use client';
import {
  Today,
  Tomorrow,
  WeatherData,
  Yesterday,
} from '@/types/weather/weather';
import { useEffect, useState } from 'react';

export default function Weather() {
  const defaultWeatherData = {
    sky: {
      code: '',
      name: '',
    },
    temperature: {
      tmax: '',
      tmin: '',
    },
  };
  const precipitation = {
    rain: '',
    snow: '',
  };
  const [todayWeatherData, setTodayWeatherData] = useState<Yesterday>({
    precipitation,
    ...defaultWeatherData,
  });
  const [tomorrowWeatherData, setTomorrowWeatherData] =
    useState<Tomorrow>(defaultWeatherData);
  const [yesterdayWeatherData, setYesterWeatherData] =
    useState<Today>(defaultWeatherData);
  useEffect(() => {
    const fetchweather = async (): Promise<WeatherData> => {
      const res = await fetch(
        'http://private-f2a7fa-weatherplanet.apiary-mock.com/weather/summary?version=2&lat=37.56083&lon=126.98667',
      );
      const data = await res.json();
      console.log(data);
      setTodayWeatherData(data.weather.summary[0].today);
      setTomorrowWeatherData(data.weather.summary[0].tomorrow);
      setYesterWeatherData(data.weather.summary[0].yesterday);
      return data;
    };

    fetchweather();
  }, []);
  return (
    <div>
      <div className="w-full h-full relative flex flex-col items-center justify-center">
        <div className="text-Headline">Weather Component</div>
        <div className="flex flex-row gap-10 w-92">
          <div className="w-1/3">Yesterday</div>
          <div className="w-1/3">{`max: ${yesterdayWeatherData.temperature.tmax}`}</div>
          <div className="w-1/3">{`min: ${yesterdayWeatherData.temperature.tmin}`}</div>
        </div>
        <div className="flex flex-row gap-10 w-92">
          <div className="w-1/3">Today</div>
          <div className="w-1/3">{`max: ${todayWeatherData.temperature.tmax}`}</div>
          <div className="w-1/3">{`min: ${todayWeatherData.temperature.tmin}`}</div>
        </div>
        <div className="flex flex-row gap-10 w-92">
          <div className="w-1/3">Tomorrow</div>
          <div className="w-1/3">{`max: ${tomorrowWeatherData.temperature.tmax}`}</div>
          <div className="w-1/3">{`min: ${tomorrowWeatherData.temperature.tmin}`}</div>
        </div>
      </div>
    </div>
  );
}
