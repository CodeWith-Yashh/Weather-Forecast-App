import React from 'react'
import tearImage from './Assets/tear.png'
import tempImage from './Assets/temperature.png'
import sunImage from './Assets/pngtree-sun-cartoon-cute-doodle-summer-png-image_6646856.png'
import { formatToLocalTime, iconUrlFromCode } from '../Services/WeatherService'
function TemperatureAndDetails({weather: {
  details, icon, temp, temp_min, temp_max, sunrise, sunset, speed,
  humidity, feels_like, timezone
}}) 
{
  return (
    <div>
      
      <div className='flex items-center justify-center py-6
        text-xl text-cyan-300'>
        <p>{details}</p>
      </div>
      <div className='flex flex-row items-center justify-between text-white py-3'>
        <img src={iconUrlFromCode(icon)} alt="clear" className='w-20'/>
        <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
        <div className='flex flex-col space-y-2'>

          <div className='flex font-light text-sm items-center justify-center'>
           <img src={tempImage} alt="temp"/>
            Real feel:
           <span className='font-medium ml-1'>{`${feels_like}°`}</span>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
           <img src={tearImage} alt="" />
            Humidity:
           <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
           <i class="fas fa-wind mr-1  "></i>
            Wind:
           <span className='font-medium ml-1'>{`${speed.toFixed()}km/h`}</span>
          </div>

        </div>

      </div>

      <div className='flex flex-row items-center justify-center space-x-2
       text-white text-sm py-3'>
        <i class="fa fa-sun-o" aria-hidden="true"></i>
        <p className='font-light'>Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise,timezone, 'hh:mm a')}</span></p>
        <p className='font-light'>|</p>

        <i class="fa fa-sun-o" aria-hidden="true"></i>
        <p className='font-light'>Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset,timezone, 'hh:mm a')}</span></p>
        <p className='font-light'>|</p>

        <i class="fa fa-arrow-up" aria-hidden="true"></i>
        <p className='font-light'>High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span></p>
        <p className='font-light'>|</p>

        <i class="fa fa-arrow-down" aria-hidden="true"></i>
        <p className='font-light'>Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span></p>
        
      </div> 
    </div>
  )
}

export default TemperatureAndDetails
