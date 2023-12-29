import React, { useState } from 'react'

function Inputs({setQuery,units,setUnits}) {
  const [city,setCity]=useState('')

  const handleSearchClick = () => {
    if(city !== '') setQuery ({q:city})
  }

  const handleLocationClick = () =>{
    if(navigator.geolocation){

      navigator.geolocation.getCurrentPosition((position) => {
        let lat= position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({lat,lon});
      })
    } 
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit)setUnits(selectedUnit)
  }

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
      <input type="text" value={city}
      onChange={(e) => setCity(e.currentTarget.value)}
      placeholder='Search for City...' 
      className='text-xl font-light p-2 w-full shadow-xl 
      focus:outline-none capitalize 
      rounded-md'
      />
      <i class="fa fa-search text-white cursor-pointer transition ease-out hover:scale-125" aria-hidden="true" onClick={handleSearchClick} ></i>
      <i class="fas fa-location text-white cursor-pointer transition ease-out hover:scale-125" aria-hidden="true" onClick={handleLocationClick}></i>
      </div>
      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button name='metric'  className='text-xl font-bold 
         text-white transition ease-out hover:scale-125'
         onClick={handleUnitsChange}
         >°C </button>
        <p className='text-xl text-white mx-1'>|</p>
        <button name='imperial' className='text-xl font-bold 
         text-white transition ease-out hover:scale-125'
         onClick={handleUnitsChange}
         > °F</button>
      </div>
      {/* For Future Reference for Degree Symbol press alt+0176 => ° */}
    </div>
  )
}

export default Inputs
