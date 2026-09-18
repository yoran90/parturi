import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast" +
          "?latitude=60.1699" +
          "&longitude=24.9384" +
          "&current=temperature_2m,weather_code,wind_speed_10m" +
          "&timezone=Europe%2FHelsinki";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch weather");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  if (loading) {
    return <p>wait ...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  function getWeatherIcon(code) {
  if (code === 0) {
    return "☀️"; // Clear sky
  }

  if (code === 1 || code === 2) {
    return "🌤️"; // Mainly clear / partly cloudy
  }

  if (code === 3) {
    return "☁️"; // Overcast
  }

  if ([45, 48].includes(code)) {
    return "🌫️"; // Fog
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return "🌦️"; // Drizzle
  }

  if ([61, 63, 65, 66, 67].includes(code)) {
    return "🌧️"; // Rain
  }

  if ([71, 73, 75, 77].includes(code)) {
    return "❄️"; // Snow
  }

  if ([80, 81, 82].includes(code)) {
    return "🌧️"; // Rain showers
  }

  if ([85, 86].includes(code)) {
    return "🌨️"; // Snow showers
  }

  if ([95, 96, 99].includes(code)) {
    return "⛈️"; // Thunderstorm
  }

  return "🌡️"; // Unknown
}


  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-2xl">
        {getWeatherIcon(weather.current.weather_code)} 
      </p>
      <div className="flex flex-col text-xs">
        <p>{weather.current.temperature_2m}°C</p>
        <p>Helsinki</p>
      </div>

    </div>
  );
}

export default Weather;
