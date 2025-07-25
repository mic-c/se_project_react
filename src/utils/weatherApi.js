import { checkResponse } from "./api";

const API_KEY = "f1f7375e5abc9374fc5d0879d1b7a575";
// const BASE_URL = "https://api.weatherapi.com/v1";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeather = ({ latitude, longitude }, APIkey = API_KEY) => {
  // const url = `${BASE_URL}/current.json?key=${APIkey}&q=${latitude},${longitude}`;
  const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Error fetching weather data:", err);
      throw err;
    });
};

export const filterWeatherData = (data) => {
  const result = {
    city: data.name,
    temp: {
      C: Math.round(data.main.temp),
      F: Math.round((data.main.temp * 9) / 5 + 32),
    },
    condition: data.weather[0].description.toLowerCase(),
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    isDay: data.weather[0].icon.includes("d"),
  };

  console.log(result);

  return result;
};
