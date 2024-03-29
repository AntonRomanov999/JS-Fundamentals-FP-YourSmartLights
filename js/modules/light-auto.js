import { Home, Group, Light, Device } from "./devices.js";
import {
  checkStateLights,
  renderItems,
  addNewLight,
  remLight,
  regenLists,
} from "./light-functions.js";
import {
  getTimeAndDate,
  displayTimeAndDate,
  displayGreetings,
} from "./clock.js";
import { getSunTimes } from "./weather.js";

//give list of all rooms(groups)
const listAllGroups = document.querySelector(".list-groups");
let groupsToProcess = [];
let groupsNamesToProcess = [];
function giveAllGroups() {
  const listGroups = Object.values(Home).filter((i) => i instanceof Group);
  listAllGroups.innerHTML = "";
  for (let i = 0; i < listGroups.length; i++) {
    const groupLabel = document.createElement("li");
    groupLabel.textContent = `${listGroups[i].name}`;
    const devIcon = document.createElement("div");
    devIcon.classList.add("icon-small");
    groupLabel.prepend(devIcon);
    listAllGroups.appendChild(groupLabel);
    //add events
    devIcon.addEventListener("click", () => {
      devIcon.classList.add("active");
      const existingGr = groupsToProcess.find(
        (item) => item.name === listGroups[i].name
      );
      if (!existingGr) {
        groupsToProcess.push(listGroups[i]);
        groupsNamesToProcess.push(listGroups[i].name);
      } else {
        devIcon.classList.remove("active");
        groupsToProcess = groupsToProcess.filter(item => item !== existingGr);
        groupsNamesToProcess = groupsNamesToProcess.filter(item => item !== existingGr.name);
      }
      console.log(groupsToProcess, groupsNamesToProcess);
    });
  }
}
//turn on/off all sheduled groups
function switchGroup(command) {
  groupsToProcess.forEach((group) => {
    if (command === "on") {
      Device.onPowerGroup(group.name);
    } else if (command === "off") {
      Device.offPowerGroup(group.name);
    }
  });
  regenLists();
}

const messContainer = document.querySelector(".message");
function displayMessages(option) {
  if (option === "group") {
    messContainer.textContent = "Please, select group of devices!";
  } else if (option === "time") {
    messContainer.textContent = "Please, select time!";
  }
}

async function sheduleAction(option) {
  let hourOn, minOn, hourOff, minOff;
  if (groupsToProcess.length <= 0) {
    displayMessages("group");
  } else {
    const sunTime = await getSunTimes();
    const timeSelectorOn = document.getElementById("time-to-on");
    const timeSelectorOff = document.getElementById("time-to-off");
    hourOn =
      option === "user" ? timeSelectorOn.value.split(":")[0] : sunTime.sunsetHr;
    minOn =
      option === "user"
        ? timeSelectorOn.value.split(":")[1]
        : sunTime.sunsetMin;
    hourOff =
      option === "user"
        ? timeSelectorOff.value.split(":")[0]
        : sunTime.sunriseHr;
    minOff =
      option === "user"
        ? timeSelectorOff.value.split(":")[1]
        : sunTime.sunriseMin;
    if (option === "user" && (!hourOn || !hourOff)) {
      displayMessages("time");
    } else {
      const time = getTimeAndDate();
      let timeOnDif =
        ((hourOn - time.hr) * 3600 + (minOn - time.min) * 60) * 1000;
      let timeOffDif =
        ((hourOff - time.hr) * 3600 + (minOff - time.min) * 60) * 1000;
      if (timeOnDif < 0) timeOnDif = timeOnDif + 86400000;
      if (timeOffDif < 0) timeOffDif = timeOffDif + 86400000;
      let result = `Groups ${groupsNamesToProcess.join(
        ", "
      )} will be turned on at ${hourOn}:${minOn}, turned off at ${hourOff}:${minOff}`;
      messContainer.textContent = `${result}`;
      // saveSysData();
      setTimeout(() => {
        switchGroup("on");
        console.log("On!!!");
      }, timeOnDif);
      setTimeout(() => {
        switchGroup("off");
        console.log("Off!!!");
      }, timeOffDif);
    }
  }
}

export { listAllGroups, giveAllGroups, sheduleAction, switchGroup };
