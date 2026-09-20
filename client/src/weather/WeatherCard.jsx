import React from 'react'
import { LuSunrise } from "react-icons/lu";
import { FaMapMarkerAlt } from 'react-icons/fa'
import { LuSunset } from "react-icons/lu";

import { formatTemperature, formatTime, getWeatherIcon } from './weatherutlis';
import * as LucideIcons from 'lucide-react';

const WeatherCard = ({ weather, unit}) => {

  const iconName = getWeatherIcon(weather.weather[0]);
  const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

  const weatherStats = [
    {
      icon: LucideIcons.Eye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: "text-blue-500",
    },
    {
      icon: LucideIcons.Wind,
      label: "Wind",
      value: `${(weather.wind.speed * 3.6).toFixed(1)} km/h`,
      color: "text-green-500",
    },
    {
      icon: LucideIcons.Droplets,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      color: "text-cyan-500",
    },
    {
      icon: LucideIcons.Gauge,
      label: "Pressure",
      value: `${(weather.main.pressure / 1000).toFixed(1)} hPa`,
      color: "text-red-500",
    },
    {
      icon: LucideIcons.Thermometer,
      label: "Feels like",
      value: `${formatTemperature(weather.main.feels_like, unit)}°${unit}`,
      color: "text-yellow-500",
    }
  ]

  return (
    <div className="bg-white/30 border border-white/30 backdrop-blur-xl rounded-xl mb-4 p-4 shadow-2xl hover:bg-white/25 transition-all duration-300">
      <div className="flex flex-col  justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/20 w-fit rounded-full">
            <FaMapMarkerAlt className="w-4 h-4 text-white/70" />
          </div>

          <div className="flex flex-col">
            <p className="text-xl text-white/80">{weather.name}</p>
            <p className="text-sm text-white/80">{weather.sys.country}</p>
          </div>
        </div>


        <div className="text-right">
          <div className="text-sm text-white/80">
            {
              new Date(weather.dt * 1000).toLocaleTimeString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric", 
              })
            }
          </div>
          <div className="text-sm text-white/80">

          {
            new Date(weather.dt * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="flex-1">
          <div className="text-5xl text-white/80">
            {formatTemperature(weather.main.temp, unit)} 
            <span className="text-2xl ml-1">°{unit}</span>
          </div>
          <div className="text-xl text-white/80 capitalize">
            {weather.weather[0].description}
          </div>

          <div className="flex text-sm text-white/80 gap-2 mt-2">
            <span>H: {formatTemperature(weather.main.temp_max, unit)} °{unit}</span>
            <span>L: {formatTemperature(weather.main.temp_min, unit)} °{unit}</span>
          </div>
        </div>
        <div className="text-white/90 transform hover:scale-110 transition-all duration-300">
        <IconComponent className="w-10 h-10" />

        </div>

      </div>

      
      {/* weather stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3  gap-4 mb-6">

      {weatherStats.map((stat, index) => (
        <div key={index} >
          <div className="bg-white/5 border border-white/30 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-full bg-white/10 gtoup-hover:bg-white/20 transition-all`}>

              <stat.icon className="w-6 h-6 text-white/80 group-hover:text-white transition-all duration-300" />
              </div>
              <span className="text-sm text-white/80">Weather stat name</span>
            </div>
            <div className="text-lg text-white/80">
              {stat.value}
            </div>
            </div>
        </div>
        ))
        
      }
      </div>

      {/* sum time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-linear-to-r from-orange-500/20 to bg-yellow-500/20 border border-white/30 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group">
          <div className="flex items-center space-x-3 mb-2">
   
            <LuSunrise className="w-6 h-6 text-orange-300" />
            <span className=" text-white">sunrise</span>
          </div>
          <div className="text-sm text-white/80">
            {formatTime(weather.sys.sunrise)}
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-500/20 to bg-slate-400 border border-white/30 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group">
          <div className="flex items-center  text-center w-full text-white space-x-3 mb-2">
            <LuSunset className="w-6 h-6" />
            <span>sunset</span>
          </div>
          <div>
            <div className="text-sm text-white/80">
              {formatTime(weather.sys.sunset)}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WeatherCard