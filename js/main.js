const body = document.body;
const infTime = document.querySelector(".info__time-clock");
const infDate = document.querySelector(".info__time-date");
const infWeather = document.querySelector(".info__weather");
const infGreetings = document.querySelector(".main__greetings");
const infState = document.querySelector(".info__state");
let tempIn = 22;

function getTimeAndDate() {
  const CurrentDate = new Date();
  return {
    date: CurrentDate,
    hr: CurrentDate.getHours(),
    min: CurrentDate.getMinutes(),
    sec: CurrentDate.getSeconds(),
  };
}

function displayTimeAndDate() {
  const time = getTimeAndDate();
  const DisplayHour = time.hr < 10 ? "0" + time.hr : time.hr;
  const DisplayMinute = time.min < 10 ? "0" + time.min : time.min;
  const DisplayDSecs = time.sec < 10 ? "0" + time.sec : time.sec;
  infTime.innerHTML = `${DisplayHour}:${DisplayMinute}:${DisplayDSecs}`;
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  infDate.innerHTML = time.date.toLocaleString("ua-UA", options);
}

async function getWeather(value) {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=50.4&lon=30.5&appid=429594b3d69cf4bf284fc29d53487c1b&units=metric"
  );
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

function displayState() {
  infState.innerHTML = `Inside ${tempIn}°C`;
}

function displayGreetings() {
  const time = getTimeAndDate();
  if (time.hr >= 23 || time.hr <= 4) {
    timeOfDay = "night";
    body.className = "night-back";
  } else if (time.hr >= 5 && time.hr <= 11) {
    timeOfDay = "morning";
    body.className = "morning-back";
  } else if (time.hr >= 11 && time.hr <= 16) {
    timeOfDay = "day";
  } else {
    timeOfDay = "evening";
    body.className = "evening-back";
  }
  infGreetings.innerHTML = `Welcome to YourSmartHome! Good ${timeOfDay}!`;
}


displayWeather();
displayGreetings();
setInterval(displayTimeAndDate, 1000);
displayTimeAndDate();
displayState()
