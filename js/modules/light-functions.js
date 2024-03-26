import { Home, Device, Group, Light } from "./devices.js";
const devicesList = document.querySelector(".main__devlist");
let itemForRm;
const groupList = document.querySelector(".main__grouplist");

function giveAllLights() {
  const listLights = Object.values(Home.allLights).filter(
    (i) => i instanceof Light
  );
  const selectLights = document.createElement("select");
  for (let i = 0; i < listLights.length; i++) {
    const light = document.createElement("option");
    light.value = listLights[i].name;
    light.textContent = `${listLights[i].name}`;
    selectLights.appendChild(light);
  }
  return selectLights;
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
    const itemName = document.createElement("h2");
    itemName.classList.add("device-card__name");
    if (device.power === "on") {
      itemName.classList.add("on");
    }
    itemName.textContent = `${deviceName} (${device.power})`;
    itemMain.appendChild(itemName);

    // Append device main section
    itemCard.appendChild(itemMain);

    // Create device parameters section
    const itemParams = document.createElement("div");
    itemParams.classList.add("device-card__params");

    // Create brightness control
    if (type === "light") {
      const brightnessInput = document.createElement("input");
      brightnessInput.type = "range";
      brightnessInput.min = 0;
      brightnessInput.max = 100;
      brightnessInput.value = device.brightness;
      brightnessInput.classList.add("slider-dim");
      brightnessInput.id = `light-dim-${i}`;
      const brightnessLabel = document.createElement("p");
      brightnessLabel.textContent = "Brightness";
      itemParams.appendChild(brightnessInput);
      itemParams.appendChild(brightnessLabel);
      // Add event listener for brightness control
      brightnessInput.addEventListener("input", () => {
        device.brightness = parseInt(brightnessInput.value);
      });
    }

    //Put selector
    if (type === "group") {
      const selectLightsLabel = document.createElement("label");
      selectLightsLabel.textContent = "Add light to group:";
      itemParams.appendChild(selectLightsLabel);
      itemParams.appendChild(giveAllLights());
      
    }

    // Append device parameters section
    itemCard.appendChild(itemParams);

    // Append device card to device list
    itemList.appendChild(itemCard);

    itemName.addEventListener("click", () => {
      device.rename(prompt("Enter new name:"));
      deviceName === device.name;
      itemName.textContent = `${device.name} (${device.power})`;
      console.log(device);
    });

    // Add event listener for power switch
    powerSwitchInput.addEventListener("change", () => {
      if (type === "group") {
        Device.switchPowerGroup(deviceName);
      } else device.powerSwitch();
      itemName.textContent = `${device.name} (${device.power})`;
      itemName.classList.toggle("on");
    });

    itemCard.addEventListener("click", () => {
      itemCard.classList.toggle("current");
      itemForRm = `${deviceName}`;
    });
  }
}

function addNewLight() {
  Light.addNewLight(prompt("Enter new name:"));
  regenLists();
}

function remLight() {
  Light.removeLight(itemForRm);
  regenLists();
}

function createGroup() {
  Group.addNewGroup(Home, prompt("Enter new group name:"));
  groupList.innerHTML = "";
  renderItems("group");
}

function delGroup() {
  Group.removeGroup(Home, itemForRm);
  groupList.innerHTML = "";
  renderItems("group");
}

function regenLists() {
  devicesList.innerHTML = "";
  renderItems("light");
  console.log("RUN");
}

export {
  renderItems,
  addNewLight,
  remLight,
  regenLists,
  createGroup,
  delGroup,
};
