import { DateTime } from "luxon";

const API_KEY = "b38a09d58f6d410f32d24cecbc9fc8f4";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData =(infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY}
    );
    // console.log(url)
    return fetch(url)
    .then((res) => res.json())
    // .then((data) => data);
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        timezone,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed},
       
    } = data 

    const {main:details,icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_max, temp_min, 
    humidity, name, dt, country, sunrise, sunset, details, icon, speed, timezone}
}
   
// const formatForecastWeather = (data) => {
//     let {timezone, daily, hourly} = data;
//     daily = daily.slice(1,6).map(d => {
//         return {
//             title: formatToLocalTime(d.dt, timezone, 'ccc'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon,
//         }
//     });

//     hourly = hourly.slice(1,6).map(d => {
//         return {
//             title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon,
//         }
//     });

//     return {timezone,daily,hourly};
// }

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData
    ('weather', searchParams).then(formatCurrentWeather);

    const {lat,lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('weather',{
        lat,lon,exclude: 'current,minutely,alerts', 
        units: searchParams.units,
    }).then(Error)

    return {...formattedCurrentWeather};
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).
setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => 
`https://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;
export {formatToLocalTime, iconUrlFromCode};