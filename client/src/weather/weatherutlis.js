export const getWeatherIcon = (weather) => {
  const iconMap = {
    Clear: "Sun",
    Clouds: "Cloud",
    Rain: "Rain",
    Snow: "Snow",
    Drizzle: "Drizzle",
    Thunderstorm: "Thunderstorm",
    Atmosphere: "Atmosphere",
    Mist: "Mist",
    Smoke: "Smoke",
    Haze: "Haze",
    Dust: "Dust",
    Fog: "Fog",
    Sand: "Sand",
    Ash: "Ash",
    Squall: "Squall",
    Tornado: "Tornado",
  };
    
  return iconMap[weather.main] || "Cloud";
}


export const formatTemperature = (temp, unit) => {
  if (unit === "F") {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
}

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const getWindDirection = (deg) => {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}