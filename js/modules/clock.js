const body = document.body;
const infTime = document.querySelector(".info__time-clock");
const infDate = document.querySelector(".info__time-date");
const infGreetings = document.querySelector(".main__greetings");

function getTimeAndDate(option) {
  let CurrentDate;
  if (!option) {
    CurrentDate = new Date();
  } else { CurrentDate = new Date(option); }
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
    infDate.innerHTML = time.date.toLocaleString("en-EN", options);
  }

  function displayGreetings() {
    const time = getTimeAndDate();
    let timeOfDay; 
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
    infGreetings.innerHTML = `Welcome to YourSmartLights! Good ${timeOfDay}!`;
  }

  export { getTimeAndDate, displayTimeAndDate, displayGreetings };