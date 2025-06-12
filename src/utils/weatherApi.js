import { checkResponse } from "./api";

const API_KEY = "f1f7375e5abc9374fc5d0879d1b7a575";
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeather = ({ latitude, longitude }, APIkey = API_KEY) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
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
  // const result = {
  //   city: data.name,
  //   temp: {
  //     F: Math.round(data.current.temp_f),
  //     C: Math.round(data.current.temp_c),
  //   },
  //   condition: data.current.condition.text.toLowerCase(),
  //   icon: data.current.condition.icon,
  //   isDay: data.current.is_day === 1,
  // };
  //
  const result = {
    city: data.name,
    temp: {
      F: Math.round(data.main.temp),
      C: Math.round((data.main.temp - 32) * (5 / 9)), // Convert F to C
    },
    type: getWeatherType(data.main.temp),
    isDay: isDay(data.sys, Date.now() / 1000), // Convert to seconds
    condition: data.weather[0].main.toLowerCase(),
  };

  console.log(result);

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  const isDaytime = sunrise * 1000 < now && now < sunset * 1000;
  console.log(isDaytime);
  return isDaytime;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
