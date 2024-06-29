import { fetchWeatherApi } from "openmeteo";

const url = "https://api.open-meteo.com/v1/forecast";

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

const getWeather = async (params) => {
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current();

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: parseFloat(current.variables(0).value()).toFixed(2),
      weatherCode: icon[current.variables(1).value()],
      windSpeed10m: parseFloat(current.variables(2).value()).toFixed(2),
    },
  };

  return weatherData;
};


export default {getWeather: getWeather};