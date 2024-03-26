import { apiReq } from "./api-req.js";
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
      case "humidity":
        return weatherData.main.humidity;
        break;
    }
  }
  
  async function displayWeather() {
    const tempOut = Math.round(await getWeather("temp"));
    const Weather = await getWeather("weather");
    infWeather.innerHTML = `Outside ${tempOut}°C, ${Weather}`;
  }

  export { displayWeather };