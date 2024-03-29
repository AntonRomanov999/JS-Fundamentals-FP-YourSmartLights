import { apiReq } from "./api-req.js";
import {
  getTimeAndDate,
  displayTimeAndDate,
  displayGreetings,
} from "./clock.js";
const infWeather = document.querySelector(".info__weather");

async function getWeather(value) {
  const response = await fetch(apiReq);
  const weatherData = await response.json();
  switch (value) {
    case "temp":
      return weatherData.main.temp;
      break;
    case "weather":
      return weatherData.weather[0].description;
      break;
    case "timezone":
      return weatherData.timezone;
      break;
    case "sunrise":
      return weatherData.sys.sunrise;
      break;
    case "sunset":
      return weatherData.sys.sunset;
      break;
  }
}

async function getSunTimes() {
  const sunriseMilsec = (await getWeather("sunrise")) * 1000;
  const sunrise = getTimeAndDate(sunriseMilsec);
  const sunsetMilsec = (await getWeather("sunset")) * 1000;
  const sunset = getTimeAndDate(sunsetMilsec);
  return {
    sunriseHr: sunrise.hr,
    sunriseMin: sunrise.min,
    sunsetHr: sunset.hr,
    sunsetMin: sunset.min,
  };
}

const tempOut = Math.round(await getWeather("temp"));
async function displayWeather() {
  const Weather = await getWeather("weather");
  const sun = await getSunTimes();
  infWeather.innerHTML = `Outside ${tempOut}°C, ${Weather}, sunrise at ${sun.sunriseHr}:${sun.sunriseMin}, sunset at ${sun.sunsetHr}:${sun.sunsetMin}`;
}

export { displayWeather, getSunTimes, tempOut };
