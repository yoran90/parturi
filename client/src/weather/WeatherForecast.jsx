import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { LuDroplets } from 'react-icons/lu';

import * as LucideIcons from 'lucide-react';
import {
  formatDate,
  formatTemperature,
  getWeatherIcon,
} from './weatherutlis';

const WeatherForecast = ({ forecast, unit }) => {
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);

    return acc;
  }, {});

  const dailyItems = Object.values(dailyForecast).slice(0, 5);

  return (
    <div className="flex flex-col gap-4 bg-white/10 backdrop-blur-xl border border-white/60 rounded-lg shadow-lg p-4 w-full max-w-2xl">
      <div className="flex items-center space-x-4 mb-3">
        <div className="p-3 bg-white/10 rounded-full">
          <FaCalendarAlt className="w-6 h-6 text-white/70" />
        </div>

        <h2 className="text-lg text-white">
          5 days forecast
        </h2>
      </div>

      <div className="space-y-4">
        {dailyItems.map((day, index) => {
          // First forecast item for this day
          const firstItem = day[0];

          // Get the highest probability of precipitation for the day
          const precipitation = Math.round(
            Math.max(...day.map((item) => item.pop || 0)) * 100
          );

          // Calculate daily min and max temperature
          const minTemp = Math.min(
            ...day.map((item) => item.main.temp_min)
          );

          const maxTemp = Math.max(
            ...day.map((item) => item.main.temp_max)
          );

          const iconName = getWeatherIcon(firstItem.weather[0]);
          const IconComponent =
            LucideIcons[iconName] || LucideIcons.Cloud;

          return (
            <div
              key={index}
              className="flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-4"
            >
              <div className="flex items-center space-x-5 flex-1">
                <div className="text-white">
                  <IconComponent className="w-10 h-10" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-white">
                    {index === 0
                      ? 'Today'
                      : formatDate(firstItem.dt)}
                  </div>

                  <div className="text-sm text-white">
                    {firstItem.weather[0].description}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-white">
                  <LuDroplets className="w-5 h-5 text-white/70" />

                  <span>{precipitation}%</span>
                </div>

                <div className="text-right text-white">
                  <div>
                    {formatTemperature(maxTemp, unit)}°
                  </div>

                  <div className="text-white/70 text-xs">
                    {formatTemperature(minTemp, unit)}°
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
