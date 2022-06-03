/* Put fake Value  for the test of the component  */

import { useEffect, useState } from "react";

/*

The differents state of the weather:

-Sunny
-Light Rain
-Patchy light rain with thunder
-Moderate rain

*/

const MeteoPreview = (props) => {

    const [bg, setBg] = useState("");

    useEffect(() => {
        //we need to determine the weather of the city to change the background image
        switch(props.city.current.condition.text) {
            case "Sunny":
                document.getElementById(props.city.location.name).style ="background-image: url('https://t3.ftcdn.net/jpg/01/94/32/00/360_F_194320004_EU6JSJyDnjE5Q9chEDMRJzNXrU0KD06I.jpg');";
                setBg("bg-sunny");
                break;

            case "Moderate or heavy rain with thunder":
            case "Patchy light rain with thunder":
                document.getElementById(props.city.location.name).style = "background-image: url('https://cdn.pixabay.com/photo/2012/02/28/00/55/clouds-17946_960_720.jpg');";
                break;

            case "Moderate rain":
                document.getElementById(props.city.location.name).style = "background-image: url('https://www.rnz.co.nz/assets/news_crops/102542/eight_col_rain.jpg?1590216378');";
                break;


            default:
                setBg("white");
        }
    }, []);

    return(
        <div id={props.city.location.name} className="rounded-xl w-full flex flex-row mb-5 h-24">
            <div className="w-1/2 pl-2 text-sm relative">
                <p className="mb-2 mt-1">{props.city.location.name}</p>
                <p className="">{props.city.location.localtime.split(" ")[1]}</p>
                <p className="absolute bottom-2">{props.city.current.condition.text}</p>
            </div>
            <div className="w-1/2 flex flex-col items-center text-xs relative">
                <p className="mt-1 text-2xl">{props.city.current.temp_c}°</p>
                <p className="absolute bottom-2"></p>
            </div>

        </div>
    )
}

export default MeteoPreview;