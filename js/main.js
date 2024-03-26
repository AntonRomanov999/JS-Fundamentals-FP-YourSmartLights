import { changeTab, showDetails } from "./modules/buttons.js";
import {
  getTimeAndDate,
  displayTimeAndDate,
  displayGreetings,
} from "./modules/clock.js";
import { displayWeather } from "./modules/weather.js";
import {
  Home,
  Group,
  Light,
  renderLights,
  addNewLight,
  remLight,
} from "./modules/devices.js";

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
Group.addNewGroup(Home, "Room1");

Light.addToGroup("Room2", Home.allLights.MyLamp1);

console.log(Home.Room2);
console.log(Object.values(Home.Room2));
Light.onGroup("Room2");
Home.allLights.MyLamp1.powerOff();
console.log(Home.allLights.MyLamp1.power);

//tests
renderLights();

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", () => {
  addNewLight();
});

const delBtn = document.getElementById("del");
delBtn.addEventListener("click", () => {
  remLight()
});
