
import SearchBar from './SearchBar'
import TemperatureToggle from './TemperatureToggle'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import WeatherCard from './WeatherCard'
import WeatherForecast from './WeatherForecast'
import { useWeather } from './useWeather'
import { IoClose } from "react-icons/io5";

const WeatherWorld = ({onClose}) => {

  const {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    toggleUnit,
    fetchWeatherByCity,
    fetchWeatherByLocation
  } = useWeather();

  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherByCity(currentWeather.name);
    } else {
      fetchWeatherByCity('New York');
    }
  }


  
  return (
    <div className="fixed bottom-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div className='absolute inset-0 bg-cover bg-center bg-no-repeat' style={{backgroundImage: "url('https://balthazar.club/o/uploads/posts/2024-01/1705346645_balthazar-club-p-krasivii-fon-oblaka-krasivo-6.jpg')"}}>
       <button onClick={onClose} className="absolute right-4 top-4 text-white cursor-pointer hover:text-white transition-all duration-300">
        <IoClose className='w-5 h-5' />
       </button>
      <div className="absolute inset-0 bg-black/40 overflow-y-scroll w-full scrollbarStyle py-12 px-2 md:px-16 lg:px-22 xl:px-72">

        <div className="">
          <div className="flex flex-col items-center justify-center text-center text-white/80">
            <div className='flex gap-0.5'>Weather <p className='text-blue-400'>Pro</p></div>
          </div>
        </div>

        {/* search bar */}
        <div className="flex  gap-2 mt-6">
          <SearchBar onSearch={fetchWeatherByCity} onLocationSearch={fetchWeatherByLocation} loading={loading} />
          {<TemperatureToggle unit={unit} toggleUnit={toggleUnit}  />}
        </div>

      {loading && (
          <div className="flex items-center justify-center mt-6 mb-6 bg-white/30 hover:bg-white/25 transition-all duration-300 backdrop:blur-xl border border-white/30 rounded-lg shadow-lg p-4 w-full">
            <div>
              <LoadingSpinner />
              <p className="text-white/90">Fetching latest weather data...</p>
            </div>
          </div>
        )

      }


      {/* error message */}
      {error && !loading && (
          <div className='mt-4 mb-4'>
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )

      }


      {/* weather card */}
      {currentWeather && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-5">
            <div className="xl:col-span-2">
              <WeatherCard  weather={currentWeather} unit={unit} />
            </div>
            <div className="xl:col-span-2">
              {forecast && (
                  <WeatherForecast forecast={forecast} unit={unit} />
                )
              }
            </div>
          </div>
        )

      }


      </div>

      </div>
    </div>
  )
}

export default WeatherWorld