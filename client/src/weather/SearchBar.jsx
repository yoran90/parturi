import React, { useEffect } from 'react'
import { IoClose } from "react-icons/io5"
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSearch } from 'react-icons/bi';
import { searchCity } from './weatherAPI';


const SearchBar = ({ onSearch, onLocationSearch, loading }) => {


  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [searchLoading, setSearchLoading] = React.useState(false);

  const searchRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        
      }
    }
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    }
  }, [])

  useEffect(() => {
    const searchTimeOut = setTimeout(async() => {
      if (query.length > 2) {
        setSearchLoading(true);

        try {
          const result = await searchCity(query);
          setSuggestions(result);
          setShowSuggestions(true);
        } catch (error) {
          console.log(error);
        } finally {
          setSearchLoading(false);
        }

      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300)

    return () => clearTimeout(searchTimeOut);
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowSuggestions(false);
    }
    
  }

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  }

  const handelSuggestionClick = (city) => {
    const cityName = city.name ? `${city.name}, ${city.state}` : city.name;
    onSearch(cityName);
    setQuery('');
    setShowSuggestions(false);
  }

  return (

    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className='relative'>
        <div className='relative group'>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading} 
            className="w-full pl-6 pr-24 py-2 bg-white/30 backdrop:blur-xl hover:bg-white/25  text-sm border border-white/30 rounded-full text-white placeholder:white/50 focus:ring-2 focus:outline-none focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-whiute/15 " 
            placeholder="Etsi mitä tahansa kaupunkia ympäri maailmaa ..."
          />

          {query && (
              <button onClick={clearSearch} className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white/90 cursor-pointer hover:text-white transition-all duration-300">
                <IoClose size={22} />
              </button>
            )

          }

          <button disabled={loading} onClick={onLocationSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all duration-300">
            <FaMapMarkerAlt />
          </button>

        </div>
      </form>
      
    
      
    <div className="w-full z-50">


      {showSuggestions && (suggestions.length > 0 || searchLoading) && (
        <div className="w-full absolute z-50 right-0 text-black/80 bg-white backdrop:blur-xl mt-6 transition-all duration-300 border border-black/30 rounded-lg shadow-lg ">
            {searchLoading ? (
                <div className="p-6 text-center text-white/70">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-white mx-auto border-white/30"></div>
                  <p>Search cities ...</p>
                </div>
              ) : (
                suggestions.map((city, index) => {
                  return (
                    <button key={`${city.name}-${city.country}-${index}`} onClick={() => handelSuggestionClick(city)} className='w-full px-6 py-2.5 text-left hover:bg-black/10 transition-all duration-200 flex items-center justify-between group border-b border-black/10 last:border-0'>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <div>{city.name},</div>
                            <span>{city.state}</span>
                          </div>

                          <div className="text-sm">{city.country}</div>

                        </div>
                        <BiSearch  />
                      </button>
                    )
                  }
                  
                )
                    
              )
            }

          </div>
        )
        
      }
      </div>
      </div>

  )
}

export default SearchBar