
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './componets/WeatherCard'

function App() {

 const [coords, setcoords] = useState()
 const [weather, setweather] = useState()
 const [temperature, settemperature] = useState()
 const [isLoading, setisLoading] = useState(true)
 useEffect(() => {
   const success =pos =>{
    const obj ={
      lat:pos.coords.latitude,
      lon:pos.coords.longitude,
    }
    setcoords(obj)
   }
   navigator.geolocation.getCurrentPosition(success)

 }, [])
 useEffect(() => {
 if(coords){
  const APIkey='52a92aca7575cf45fe3743aae486e2ff'
  const url =`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`
  
  axios.get(url)

     .then(res => {
      setweather(res.data)
      const obj ={
        celsius: (res.data.main.temp - 273.15).toFixed(1), 
        farenheit: ((res.data.main.temp -273.15)*9/5+32).toFixed(1),
        kelvin: res.data.main.temp
      }
      settemperature(obj)
     }
      )
     .catch(err => console. log(err))
     .finally(() => setisLoading(false))
  }
 }, [coords])

  return (
    <div className="App">
     { 
      isLoading ?
       <h1 className='loading__star'>Loading....</h1>
       :
        <WeatherCard 
        weather ={weather}
        temperature={temperature}
        />
      }
    </div>
  )
}

export default App
