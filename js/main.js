import { changeTab, showDetails } from "./modules/buttons.js";
import {
  getTimeAndDate,
  displayTimeAndDate,
  displayGreetings,
} from "./modules/clock.js";
import { displayWeather } from "./modules/weather.js";
import { Home, Group, Light } from "./modules/devices.js";
import {
  checkStateLights,
  renderItems,
  addNewLight,
  remLight,
} from "./modules/light-functions.js";

changeTab();
showDetails();

const infState = document.querySelector(".info__state");
let tempIn = 22;

function displayState() {
  infState.innerHTML = ``;
  infState.innerHTML = `Inside ${tempIn}°C, ${checkStateLights()}`;
}

//test
// Light.addNewLight("MyLamp1");
// Light.addNewLight("MyLamp2");
// Light.addNewLight("MyLamp3");
// Light.addToGroup('Room2', Home.allLights.MyLamp1);
//test
displayWeather();
displayGreetings();
setInterval(displayTimeAndDate, 1000);
setInterval(displayState, 1000);
displayTimeAndDate();
renderItems('light');
renderItems('group');


