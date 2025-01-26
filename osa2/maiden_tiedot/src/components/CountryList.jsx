import CountryDetail from './CountryDetail';

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />;
  }

  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>{country.name.common}</li>
      ))}
    </ul>
  );
};

export default CountryList;
