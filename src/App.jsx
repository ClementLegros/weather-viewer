import { useState } from "react";

function App() {

  const [city, setCity] = useState("");
  const [isWeatherLoaded, setIsWeatherLoaded] = useState(false);
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);

  const getWeather = () => {

    //we need to check that the city is not empty
    if (city === "") {
      setError(true);
      return;
    }
    fetch("https://api.weatherapi.com/v1/current.json?key=fc0f89300792451fab680040220306&q=" + city + "&aqi=no")
      .then(res => res.json())
      .then(data => {
        //we need to check if he found the weather
        if (data.location.name === "") {
          return;
        }

        setWeather(data);
        setIsWeatherLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setIsWeatherLoaded(false);
        setError(true);
      });

  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col border-2 border-gray-500 h-52 w-3/4 items-center justify-center shadow-md">
        <label className="font-semibold underline text-xl">Enter the name of your city:</label>
        <input className="border-2 border-gray-500 mt-5" onKeyDown={(e) => setCity(e.target.value)} type="text" />
        {
          error ? <p className="text-red-400">Please enter a valid city</p> : null
        }
        <button className="bg-blue-400 px-5 w-20 h-8 rounded-lg mt-5 flex flex-row justify-center items-center" onClick={getWeather}>Search</button>
      </div>
      {
        isWeatherLoaded ?
          <div className="mt-5 border-2 border-gray-500 flex flex-row w-3/4 shadow-md">
            <div className="flex flex-col items-center text-center w-2/3">
              <p className="underline font-semibold text-xl">{weather.location.name}</p>
              <p className="text-4xl">{weather.current.temp_c}°</p>
              <p className="text-xl">{weather.current.condition.text}</p>
              <p>{weather.current.last_updated}</p>
            </div>
            <div className="flex flex-col w-1/3 justify-center items-center">
              <img className="w-40" src={weather.current.condition.icon} alt="weather icon" />
            </div>
          </div>
          : null
      }
    </div>
  );
}

export default App;
