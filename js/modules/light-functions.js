import { Home, Device, Group, Light, saveSysData } from "./devices.js";
const devicesList = document.querySelector(".main__devlist");
let itemForRm;
const groupList = document.querySelector(".main__grouplist");

function checkStateLights() {
  let stateOfLights;
  let statesLights = Object.values(Home.allLights).filter(
    (i) => i instanceof Light
  ).map(obj => obj.power);
  let totNumLights = 0, onNumLights = 0, offNumLights = 0;
  statesLights.forEach((i) => {
  ++totNumLights;
  if (i === 'on') ++onNumLights;
  if (i === 'off') ++offNumLights;
  });
  if (statesLights.every((i) => i === 'off')) {
    stateOfLights = `All lights are OFF (a total of ${totNumLights} lights in the system)`;
  } else {
    stateOfLights = `Some lights are ON (a total of ${totNumLights} lights in the system, currently ${onNumLights} of them are ON)`;
  }
  return stateOfLights;
}

function giveAllLights() {
  const listLights = Object.values(Home.allLights).filter(
    (i) => i instanceof Light
  );
  const selectLights = document.createElement("select");
  const firsString = document.createElement("option");
  firsString.textContent = "Choose light to add:";
  selectLights.appendChild(firsString);
  for (let i = 0; i < listLights.length; i++) {
    const light = document.createElement("option");
    light.value = listLights[i].name;
    light.textContent = `${listLights[i].name}`;
    selectLights.appendChild(light);
  }
  return selectLights;
}

function renderGroupContent(group, place) {
  // display group content
  const groupPContent = [];
  const groupContent = Object.values(group).filter((i) => i instanceof Light);
  groupContent.forEach((i) => {
    groupPContent.push(` ${i.name}`);
  });
  place.insertAdjacentHTML("beforeend", `<p>${groupPContent.toString()}</p>`);
}

function renderItems(type) {
  let items;
  let itemList;

  if (type === "light") {
    items = Object.values(Home.allLights).filter((i) => i instanceof Light);
    itemList = devicesList;
  } else if (type === "group") {
    items = Object.values(Home).filter((i) => i instanceof Group);
    itemList = groupList;
  }
  for (let i = 0; i < items.length; i++) {
    let device = items[i];
    let deviceName = device.name;

    // Create device card
    const itemCard = document.createElement("div");
    itemCard.classList.add("device-card", "frame-inner");

    // Create device main section
    const itemMain = document.createElement("div");
    itemMain.classList.add("device-card__main");

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
    itemMain.appendChild(powerSwitchLabel);

    // Create device name
    const itemName = document.createElement("div");
    itemName.classList.add("device-card__name");
    if (device.power === "on") {
      itemName.classList.add("on");
    }
    // put brightness indicator
    function renderIcon() {
      if (type === "light") {
        let devIcon = document.createElement("div");
        devIcon.classList.add("device-icon");
        if (device.power === "on") {
          let colorBrightness = device.brightness * 0.1;
          let colorTemp = device.colorTemp;
          devIcon.style.backgroundColor = `rgb(255, 255, ${
            255 - 0.5 * colorTemp
          })`;
          devIcon.style.boxShadow = `0 0 10px ${colorBrightness}px rgba(255, 255, ${
            255 - 0.5 * colorTemp
          })`;
        }
        itemName.appendChild(devIcon);
      }
    }
    let devIcon;
    itemName.textContent = `${deviceName} (${device.power})`;
    renderIcon();
    itemMain.appendChild(itemName);

    // Append device main section
    itemCard.appendChild(itemMain);

    // Create device parameters section
    const itemParams = document.createElement("div");
    itemParams.classList.add("device-card__params");

    // Create brightness and color controls
    if (type === "light") {
      const brightnessInput = document.createElement("input");
      brightnessInput.type = "range";
      brightnessInput.min = 0;
      brightnessInput.max = 100;
      brightnessInput.value = device.brightness;
      brightnessInput.classList.add("slider-dim");
      brightnessInput.id = `light-dim-${i}`;
      const brightnessLabel = document.createElement("p");
      brightnessLabel.textContent = "Brightness (dark < > bright)";
      itemParams.appendChild(brightnessInput);
      itemParams.appendChild(brightnessLabel);
      const colorInput = document.createElement("input");
      colorInput.type = "range";
      colorInput.min = 0;
      colorInput.max = 100;
      colorInput.value = device.colorTemp;
      colorInput.classList.add("slider-dim");
      colorInput.id = `light-dim-${i}`;
      const colorLabel = document.createElement("p");
      colorLabel.textContent = "Color  (cold < > warm)";
      itemParams.appendChild(colorInput);
      itemParams.appendChild(colorLabel);
      // Add event listener for brightness an color controls
      brightnessInput.addEventListener("input", () => {
        device.brightness = parseInt(brightnessInput.value);
        itemName.removeChild(itemName.lastChild);
        renderIcon();
        saveSysData();
      });
      colorInput.addEventListener("input", () => {
        device.colorTemp = parseInt(colorInput.value);
        itemName.removeChild(itemName.lastChild);
        renderIcon();
        saveSysData();
      });
    }
    //Put selector
    let selectLights = giveAllLights();
    if (type === "group") {
      const selectLightsLabel = document.createElement("label");
      selectLightsLabel.textContent = "Add light to group:";
      itemParams.appendChild(selectLightsLabel);
      selectLights.addEventListener("change", (event) => {
        const devToAdd = event.target.value;
        Light.addToGroup(`${device.name}`, Home.allLights[devToAdd]);
        selectLights.removeChild(
          selectLights.options[selectLights.selectedIndex]
        );
        itemParams.removeChild(itemParams.lastChild);
        renderGroupContent(device, itemParams);
        saveSysData();
      });
      itemParams.appendChild(selectLights);
      renderGroupContent(device, itemParams);
    }
    // Append device parameters section
    itemCard.appendChild(itemParams);
    // Append device card to device list
    itemList.appendChild(itemCard);
    itemName.addEventListener("click", () => {
      device.rename(prompt("Enter new name:"));
      deviceName === device.name;
      itemName.textContent = `${device.name} (${device.power})`;
      renderIcon();
      saveSysData();
    });
    // Add event listener for power switch
    powerSwitchInput.addEventListener("change", () => {
      if (type === "group") {
        Device.switchPowerGroup(deviceName);
      } else device.powerSwitch();
      itemName.textContent = `${device.name} (${device.power})`;
      itemName.classList.toggle("on");
      renderIcon();
      saveSysData();
    });

    itemCard.addEventListener("click", () => {
      itemCard.classList.toggle("current");
      itemForRm = `${deviceName}`;
      saveSysData();
    });
  }
}

function addNewLight() {
  Light.addNewLight(prompt("Enter new name:"));
  regenLists();
  saveSysData();
}

function remLight() {
  Light.removeLight(itemForRm);
  regenLists();
  saveSysData();
}

function createGroup() {
  Group.addNewGroup(Home, prompt("Enter new group name:"));
  groupList.innerHTML = "";
  renderItems("group");
  saveSysData();
}

function delGroup() {
  Group.removeGroup(Home, itemForRm);
  groupList.innerHTML = "";
  renderItems("group");
  saveSysData();
}

function regenLists() {
  devicesList.innerHTML = "";
  groupList.innerHTML = "";
  renderItems("group");
  renderItems("light");
}

export {
  checkStateLights,
  renderItems,
  addNewLight,
  remLight,
  regenLists,
  createGroup,
  delGroup,
};
