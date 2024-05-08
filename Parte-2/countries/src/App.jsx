import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country, showDetails }) => (
  <div>
    <p>{country.name.common}</p>
    {showDetails && (
      <button onClick={() => showDetails(country)}>Mostrar</button>
    )}
  </div>
);

const CountryDetails = ({ country, weatherData }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>
      <strong>Capital:</strong> {country.capital}
    </p>
    <p>
      <strong>Área:</strong> {country.area} km<sup>2</sup>
    </p>
    <p>
      <strong>Idiomas:</strong> {Object.values(country.languages).join(", ")}
    </p>
    <img
      src={country.flags.png}
      alt={`Bandera de ${country.name.common}`}
      style={{ width: "200px" }}
    />
    {weatherData && (
      <div>
        <h2>Datos meteorológicos</h2>
        <p>
          <strong>Temperatura: </strong> {(weatherData.main.temp - 273.15).toFixed(2)}°C
        </p>
        <p>
          <strong>Descripción: </strong> {weatherData.weather[0].description}
        </p>
        <p>
          <strong>Viento:</strong> {weatherData.wind.speed} m/s
        </p>
        {weatherData.weather[0].icon && (
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Icono del tiempo"
            style={{ width: "100px" }}
          />
        )}
      </div>
    )}
  </div>
);

const Filter = ({ newFilter, handleFilter, onSearch }) => (
  <div>
    Buscar países:
    <input
      placeholder="Filtrar países"
      value={newFilter}
      onChange={(e) => {
        handleFilter(e);
        onSearch(e);
      }}
    />
  </div>
);

const Countries = ({ filterCountries, showDetails, newFilter, weatherData }) => {
  const renderWeatherData = (country) => {
    if (country.capital === weatherData?.name) {
      return (
        <div>
          <h2>Datos meteorológicos</h2>
          <p>
            <strong>Temperatura:</strong> {weatherData.main.temp}°C
          </p>
          <p>
            <strong>Descripción:</strong> {weatherData.weather[0].description}
          </p>
          <p>
            <strong>Viento:</strong> {weatherData.wind.speed} m/s
          </p>
          {weatherData.weather[0].icon && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Icono del tiempo"
              style={{ width: "100px" }}
            />
          )}
        </div>
      );
    };
    return null;
  };

  if (filterCountries.length === 1) {
    const country = filterCountries[0];
    return (
      <div>
        <CountryDetails country={country} />
        {weatherData && renderWeatherData(country)}
      </div>
    );
  } else if (filterCountries.length < 10) {
    return (
      <>
        <h2>Países</h2>
        <div>
          {filterCountries.map((country) => (
            <Country
              key={country.name.common}
              country={country}
              showDetails={showDetails}
            />
          ))}
        </div>
      </>
    );
  } else if (filterCountries.length >= 10 && newFilter) {
    // Si hay 10 o más países en el filtro, mostrar un mensaje de advertencia
    return (
      <p>
        Por favor, sea más específico en su búsqueda. Hay demasiados países para
        mostrar.
      </p>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const onSearch = async (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);

    if (e.target.value && e.target.value.trim() !== "") {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      );

      if (filteredCountries.length === 1) {
        const city = filteredCountries[0].capital;
        try {
          const apiKey = import.meta.env.VITE_SOME_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
          const response = await axios.get(url);
          setWeatherData(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    }
  };

  const showDetails = async (country) => {
    setSelectedCountry(country);
    const city = country.capital;
    try {
      const apiKey = import.meta.env.VITE_SOME_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <>
      <Filter
        newFilter={newFilter}
        handleFilter={handleFilter}
        onSearch={onSearch}
      />
      {selectedCountry && (
        <CountryDetails country={selectedCountry} weatherData={weatherData} />
      )}
      {filterCountries.length === 1 && (
        <CountryDetails
          country={filterCountries[0]}
          weatherData={weatherData}
        />
      )}
      {filterCountries.length !== 1 && (
        <Countries filterCountries={filterCountries} showDetails={showDetails} />
      )}
    </>
  );
};

export default App;
