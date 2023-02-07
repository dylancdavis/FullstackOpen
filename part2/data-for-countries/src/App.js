import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { getAll } from './services/countries';

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
            <tr>
              <td key={d.cca3}>{d.flag} {d.name.common}  </td>
              <td><button onClick={handleShow(d.name.common)}>Show</button></td>
            </tr>
          ) )
        }
      </tbody>
    </table>
  )

}

const CountryItem = ({country}) => {
  console.log(country);
  return (
    <>
      <h1>{country.name.common} {country.flag}</h1>
      {country.name.common !== country.name. official && <p><i>({country.name.official})</i></p>}
      <p><i>Capital:</i> {country.capital}</p>
      <p><i>Area:</i> {country.area}</p>
      <h6>Languages: </h6>
      <ul>
        {Object.values(country.languages).map(p => <li key={p}>{p}</li>)}
      </ul>
    </>
  )
}

export default App;
