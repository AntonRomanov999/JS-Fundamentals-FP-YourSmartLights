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
import { renderAir } from "./modules/air.js";

readSysData();
changeTab();
showDetails();


const infState = document.querySelector(".info__state");
// let tempIn = 22;

function displayState() {
  infState.innerHTML = ``;
  infState.innerHTML = `${checkStateLights()}`;
}

// //test
// Light.addNewLight("MyLamp1");
// Light.addNewLight("MyLamp2");
// Light.addNewLight("MyLamp3");
// Light.addToGroup('Room2', Home.allLights.MyLamp1);
// console.log(Home.allLights)
// //test
Air.addNewAir("Room1");
renderAir();

displayWeather();
displayGreetings();
setInterval(displayTimeAndDate, 1000);
setInterval(displayState, 1000);
displayTimeAndDate();
renderItems('light');
renderItems('group');
giveAllGroups();


