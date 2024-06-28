import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";

const url = "https://api.open-meteo.com/v1/forecast";

const getWeather = async ({ params }) => {
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current();

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: parseFloat(current.variables(0).value()).toFixed(2),
      weatherCode: current.variables(1).value(),
      windSpeed10m: parseFloat(current.variables(2).value()).toFixed(2),
    },
  };

  return weatherData;
};

const icon = {
  0: "https://openweathermap.org/img/wn/01d@2x.png",
  1: "http://openweathermap.org/img/wn/02d@2x.png",
  2: "http://openweathermap.org/img/wn/03d@2x.png",
  3: "http://openweathermap.org/img/wn/04d@2x.png",
  45: "http://openweathermap.org/img/wn/50d@2x.png",
  48: "http://openweathermap.org/img/wn/50d@2x.png",
  51: "http://openweathermap.org/img/wn/09d@2x.png",
  53: "http://openweathermap.org/img/wn/09d@2x.png",
  55: "http://openweathermap.org/img/wn/09d@2x.png",
  56: "http://openweathermap.org/img/wn/09d@2x.png",
  57: "http://openweathermap.org/img/wn/09d@2x.png",
  61: "http://openweathermap.org/img/wn/10d@2x.png",
  63: "http://openweathermap.org/img/wn/10d@2x.png",
  65: "http://openweathermap.org/img/wn/10d@2x.png",
  66: "http://openweathermap.org/img/wn/13d@2x.png",
  67: "http://openweathermap.org/img/wn/13d@2x.png",
  71: "http://openweathermap.org/img/wn/13d@2x.png",
  73: "http://openweathermap.org/img/wn/13d@2x.png",
  75: "http://openweathermap.org/img/wn/13d@2x.png",
  77: "http://openweathermap.org/img/wn/13d@2x.png",
  80: "http://openweathermap.org/img/wn/09d@2x.png",
  81: "http://openweathermap.org/img/wn/09d@2x.png",
  82: "http://openweathermap.org/img/wn/09d@2x.png",
  85: "http://openweathermap.org/img/wn/13d@2x.png",
  86: "http://openweathermap.org/img/wn/13d@2x.png",
  95: "http://openweathermap.org/img/wn/11d@2x.png",
  96: "http://openweathermap.org/img/wn/11d@2x.png",
  99: "http://openweathermap.org/img/wn/11d@2x.png",
};

const CountryDetail = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const params = {
      latitude: country.capitalInfo.latlng[0],
      longitude: country.capitalInfo.latlng[1],
      current: ["temperature_2m", "weather_code", "wind_speed_10m"],
      wind_speed_unit: "ms",
    };

    console.log(params);

    getWeather({ params })
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((error) => console.log("eror weather", error));
  }, [country]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { temperature2m, weatherCode, windSpeed10m } = weatherData.current;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages || {}).map((langCode) => (
            <li key={langCode}>{country.languages[langCode]}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.svg} alt={country.flags.alt} />
      </div>
      <div>
        <h1>Weather in {country.name.common}</h1>
        <p>Temperature: {temperature2m}°C</p>
        <p>Weather Code: {weatherCode}</p>
        <img src={icon[weatherCode]} />
        <p>Wind Speed: {windSpeed10m} m/s</p>
      </div>
    </div>
  );
};

export default CountryDetail;
