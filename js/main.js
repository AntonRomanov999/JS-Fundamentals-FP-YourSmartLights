import { changeTab, showDetails } from "./modules/buttons.js";
import {
  getTimeAndDate,
  displayTimeAndDate,
  displayGreetings,
} from "./modules/clock.js";
import { displayWeather } from "./modules/weather.js";
import { Home, Group, Light, Air, readSysData } from "./modules/devices.js";
import {
  checkStateLights,
  renderItems,
  addNewLight,
  remLight,
} from "./modules/light-functions.js";
import { listAllGroups, giveAllGroups } from "./modules/light-auto.js";
import { renderAir, airState } from "./modules/air.js";

readSysData();
changeTab();
showDetails();
renderAir();

const infState = document.querySelector(".info__state");

function displayState() {
  infState.innerHTML = ``;
  infState.innerHTML = `${checkStateLights()} <br> ${airState()}`;
}

displayWeather();
displayGreetings();
displayTimeAndDate();
renderItems('light');
renderItems('group');
giveAllGroups();

setInterval(displayTimeAndDate, 1000);
setInterval(displayState, 1000);


