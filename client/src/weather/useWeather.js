import React from 'react';
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForCoords,
  searchCity
} from './weatherAPI';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = React.useState(null);
  const [forecast, setForecast] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [unit, setUnit] = React.useState('C');


  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, foreCast] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForCoords(city)
      ]);

      setCurrentWeather(weatherData);
      setForecast(foreCast);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const [weatherData, foreCast] = await getCurrentWeatherByCoords(latitude, longitude);
        setCurrentWeather(weatherData);

        const forecastData = await getWeatherForCoords(weatherData.name);
        setForecast(forecastData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    }, (error) => {
      setError('Unable to retrieve your location');
      setLoading(false);
    });
  }

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  }
   
  React.useEffect(() => {
    fetchWeatherByCity('New York');
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    toggleUnit,
    fetchWeatherByCity,
    fetchWeatherByLocation
  };
};

