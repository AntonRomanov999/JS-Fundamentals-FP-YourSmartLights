import { Home, Device, Group, Air, saveSysData } from "./devices.js";
import { tempOut } from "./weather.js";

const acsList = document.getElementById("AirCs");
let airForRm;

function addNewAir() {
  Air.addNewAir(prompt("Enter new name:"));
  regenAir();
}

function removeAir() {
  Air.removeAir(airForRm);
}

function autoAir(option) {
  let items = Object.values(Home.allAirs).filter((i) => i instanceof Air);
  for (let i = 0; i < items.length; i++) {
    let device = items[i];
    if (option === "off") {
      device.powerOff();
    } else if (option === "auto") {
      if (tempOut > 26) {
        device.mainmode = "cool";
        device.powerOn();
      } else if (tempOut < device.temp) {
        device.mainmode = "heat";
        device.powerOn();
        device.temp = 22;
      }
    }
  }
  regenAir();
}

function renderAir() {
  let items = Object.values(Home.allAirs).filter((i) => i instanceof Air);
  console.log(items, acsList);
  for (let i = 0; i < items.length; i++) {
    let device = items[i];
    let deviceName = device.name;
    // Create device card and buttons
    const itemCard = document.createElement("div");
    itemCard.classList.add("device-card", "frame-inner");
    const itemControls = document.createElement("div");
    itemControls.classList.add("ac-controls");
    itemCard.appendChild(itemControls);
    // Create power switch
    const powerSwitchLabel = document.createElement("label");
    powerSwitchLabel.classList.add("switch");
    const powerSwitchInput = document.createElement("input");
    powerSwitchInput.type = "checkbox";
    powerSwitchInput.checked = device.power === "on";
    const powerSwitchSpan = document.createElement("span");
    powerSwitchSpan.classList.add("slider", "round");
    powerSwitchLabel.appendChild(powerSwitchInput);
    powerSwitchLabel.appendChild(powerSwitchSpan);
    itemControls.appendChild(powerSwitchLabel);
    // Create device name
    const itemName = document.createElement("div");
    itemName.classList.add("device-card__name");
    if (device.power === "on") {
      itemName.classList.add("on");
    }
    function updInfo() {
      itemName.textContent = `${deviceName} (${device.power}) : ${device.temp}°C, ${device.mainmode}, ${device.mode}`;
    }
    updInfo();
    itemCard.appendChild(itemName);
    // create control for temp
    const tempInput = document.createElement("input");
    tempInput.type = "range";
    tempInput.min = 16;
    tempInput.max = 24;
    tempInput.value = device.temp;
    tempInput.classList.add("slider-dim");
    tempInput.id = `temp-${i}`;
    const tempLabel = document.createElement("p");
    tempLabel.textContent = "Set temp (colder < > warmer)";
    itemCard.appendChild(tempInput);
    itemCard.appendChild(tempLabel);
    // Add event listener
    tempInput.addEventListener("input", () => {
      device.temp = parseInt(tempInput.value);
      updInfo();
    });
    // Add event listener to switch
    powerSwitchInput.addEventListener("change", () => {
      device.powerSwitch();
      updInfo();
      itemName.classList.toggle("on");
    });
    // create buttons for mods
    const btnMode = document.createElement("button");
    btnMode.textContent = device.mainmode === "cool" ? "Cool" : "Heat";
    btnMode.addEventListener("click", () => {
      device.mainmode = device.mainmode === "heat" ? "cool" : "heat";
      btnMode.textContent = device.mainmode === "heat" ? "Heat" : "Cool";
      device.mainmode === "heat"
        ? btnMode.classList.add("heat")
        : btnMode.classList.remove("heat");
      updInfo();
    });
    device.possiblemods.forEach((i) => {
      const btn = document.createElement("button");
      btn.textContent = `${i}`;
      btn.id = `${i}`;
      btn.addEventListener("click", () => {
        device.mode = `${i}`;
        updInfo();
      });
      itemControls.appendChild(btn);
    });
    itemControls.appendChild(btnMode);
    itemName.addEventListener("click", () => {
      device.rename(prompt("Enter new name:"));
      deviceName === device.name;
      updInfo();
    });
    itemCard.addEventListener("click", () => {
      itemCard.classList.toggle("current");
      airForRm = `${deviceName}`;
    });

    acsList.appendChild(itemCard);
  }
}

function regenAir() {
  acsList.innerHTML = "";
  renderAir();
}

export { renderAir, addNewAir, removeAir, autoAir };
