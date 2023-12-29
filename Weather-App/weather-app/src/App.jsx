import React, { useEffect, useState, useReducer } from 'react'
import TopButtons from './Components/TopButtons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Inputs from './Components/Inputs'
import TimeAndLocations from './Components/TimeAndLocations'
import TemperatureAndDetails from './Components/TemperatureAndDetails'
import getFormattedWeatherData from './Services/WeatherService'

const App = () => {

  const [query, setQuery] = useState({q: 'London'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)


useEffect(() => {
  const fetchWeather = async () => {
    const message = query.q ? query.q : 'current location.'
    toast.info('Fetching Info For ' + message)

     await getFormattedWeatherData({...query,units}).then(
      (data)=>{

        toast.success(`Successfully Fetched Weather For ${data.name}, ${data.country}.`) 

        setWeather(data)
      })
   
};

fetchWeather();
}, [query, units])

const formatBackgrounds = () => {
  if(!weather) return ' from-cyan-700 to-blue-700'
  const threshold = units === 'metric' ? 20 : 60
  if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700'
  return 'from-yellow-700 to-orange-700'
}

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 
    bg-gradient-to-br ${formatBackgrounds()}
    h-fit shadow-xl shadow-gray-400 `}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      {weather && (
          <div>
            <TimeAndLocations weather={weather}/>
            <TemperatureAndDetails weather={weather}/>
            {/* <Forecast title="hourly forecast"/>
            <Forecast title="daily forecast"/> */ }
          </div>
      )}
      <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              />
    </div>
  )
}

export default App

