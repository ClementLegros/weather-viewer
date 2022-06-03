/*

Tout les temps ne sont pas encore traité, il peut donc y avoir des problèmes avec l'affichage des données.

*/

import { useEffect, useState } from "react";
import MeteoPreview from "../Components/MeteoPreview";

const HomePage = () => {

    const [favoriteCity, setFavoriteCity] = useState(["Paris", "Lyon"]);
    const [favoriteCityWeather, setFavoriteCityWeather] = useState([]);
    const [searchOn, setSearchOn] = useState(false);

    useEffect(() => {
        //foreach city in favoriteCity
        favoriteCity.forEach(city => {
            //get the weather of the city
            getWeather(city);
        });
        
    }, [favoriteCity]);

    const getWeather = (city) => {

        fetch("https://api.weatherapi.com/v1/current.json?key=fc0f89300792451fab680040220306&q=" + city + "&aqi=no")
            .then(res => res.json())
            .then(data => {
                setFavoriteCityWeather(prevState => [...prevState, data]);
                console.log(data)
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    const handleSearch = (e) => {
        setSearchOn(true);

    }

    const getCityName = () => {

    }

    return (
        <div className="w-full h-screen flex flex-col bg-black">
            <div className="w-full h-14 flex flex-col justify-center pl-5 pt-14">
                <h1 className="text-white text-2xl font-semibold">Météo</h1>
                <input onKeyDown={handleSearch} className="bg-gray-500 w-[90%] pl-2 rounded-lg placeholder:text-gray-200" placeholder="Recherche une ville ou un aéroport" type="text" />
            </div>
            <div className="mt-10 mx-5">
                {
                    favoriteCityWeather.map(city => {
                        return (
                        <MeteoPreview 
                        key={city.location.name}
                        city={city} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HomePage;