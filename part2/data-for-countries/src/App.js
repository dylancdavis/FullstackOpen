import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { getAll } from './services/countries';

const api_key = process.env.REACT_APP_API_KEY

const App = () => {

  const [countries,setCountries] = useState(null)
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(r => setCountries(r.data))
  }, [])

  const handleShow = name => {
    return () => {
      setInputText(name)
    }
  }

  return (
  <div>
    <h1>Countries</h1>
    <div>
      <span>Search for Countries: </span>
      <input value={inputText} onChange={(e)=> setInputText(e.target.value)} />
    </div>
    <hr></hr>
    <CountryList countries={countries} searchText={inputText} handleShow={handleShow} />
  </div>
  )
}

const CountryList = ({countries, searchText, handleShow}) => {
  if (searchText === '') {
    return <p>Please search for a country.</p>
  }
  
  const filteredList = countries.filter(d => d.name.common.toLowerCase().includes(searchText.toLowerCase()))
  
  if (filteredList.length > 10) {
    return <p>Match too broad, keep typing...</p>
  }

  if (filteredList.length === 1) {
    return <CountryItem country={filteredList[0]} />
  }

  return (
    <table>
      <tbody>
        {
           filteredList.map(d => (
            <tr key={d.cca3}>
              <td>{d.flag} {d.name.common}  </td>
              <td><button onClick={handleShow(d.name.common)}>Show</button></td>
            </tr>
          ) )
        }
      </tbody>
    </table>
  )

}

const CountryItem = ({country}) => {
  
  //console.log(country);

  const [weather,setWeather] = useState(null)

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`)
    .then(r => {
      setWeather(r.data)
      console.log(r.data);
    })
  }, [])



  return (
    <>
      <h1>{country.name.common} {country.flag}</h1>
      {country.name.common !== country.name.official && <p><i>({country.name.official})</i></p>}
      <p><i>Capital:</i> {country.capital}</p>
      <p><i>Area:</i> {country.area}</p>
      <h6>Languages: </h6>
      <ul>
        {Object.values(country.languages).map(p => <li key={p}>{p}</li>)}
      </ul>
      <h2>Weather in {country.capital}:</h2>
      <WeatherSection weather={weather} />
    </>
  )
}

const WeatherSection = ({ weather }) => {
  if (!weather) return null

  const type = weather.weather[0].main
  const icon = weather.weather[0].icon
  const kelvin = weather.main.feels_like
  const fahrenheit = Math.round(1.8*(kelvin - 273) + 32)
  const windSpeed = weather.wind.speed

  return (
    <>
      <p>{type} <img src={`http://openweathermap.org/img/wn/${icon}.png`} /></p>
      <p>Feels Like {fahrenheit}°F</p>
      <p>Wind speed of {windSpeed}m/s</p>
    </>
  )
}

export default App;
