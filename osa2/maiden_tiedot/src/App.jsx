import { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  // maiden tiedot REST API:sta
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  // filter
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter)
  );

  return (
    <div>
      <h1>Country Info</h1>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search countries"
      />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default App;
