import { changeTab, showDetails } from "./modules/buttons.js";
import {
  getTimeAndDate,
  displayTimeAndDate,
  displayGreetings,
} from "./modules/clock.js";
import { displayWeather } from "./modules/weather.js";
import { Home, Group, Light } from "./modules/devices.js";
import {
  renderItems,
  addNewLight,
  remLight,
} from "./modules/light-functions.js";

changeTab();
showDetails();

const infState = document.querySelector(".info__state");
let tempIn = 22;
function displayState() {
  infState.innerHTML = `Inside ${tempIn}°C`;
}

displayWeather();
displayGreetings();
setInterval(displayTimeAndDate, 1000);
displayTimeAndDate();
displayState();

//tests
Light.addNewLight("MyLamp1");
Light.addNewLight("MyLamp2");
Light.addNewLight("MyLamp3");
Group.addNewGroup(Home, "Room2");

Light.addToGroup("Room2", Home.allLights.MyLamp1);
Light.addToGroup("Room2", Home.allLights.MyLamp2);



//tests
renderItems('light');
renderItems('group');


