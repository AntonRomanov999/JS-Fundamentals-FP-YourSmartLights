const Home = {
  allLights: {},
  allAirConds: {},
  allHeaters: {},
};

class Group {
  constructor(name) {
    this.name = name;
  }
  static addNewGroup(section, newName) {
    section[newName] = new Group(newName);
  }
  static removeGroup(section, name) {
    delete section[name];
  }
}

class Device {
  #power;
  constructor(name) {
    this.name = name;
    this.#power = "off";
  }
  get power() {
    return this.#power;
  }
  powerOn() {
    this.#power = "on";
  }
  powerOff() {
    this.#power = "off";
  }
  powerSwitch() {
    if (this.#power === "on") {
      this.#power = "off";
    } else this.#power = "on";
  }
  rename(newName) {
    if (!newName) { this.name = this.name } else this.name = newName;
  }
  static addToGroup(groupName, device) {
    if (!Home[groupName]) {
      Group.addNewGroup(Home, groupName);
    }
    let group = Home[groupName];
    group[device.name] = device;
  }
  static removeFromGroup(groupName, device) {
    if (Home[groupName]) {
      let group = Home[groupName];
      delete group[device.name];
    }
  }
  static onGroup(groupName) {
    Object.values(Home[groupName]).forEach((i) => {
      if (i instanceof Device) {
        i.powerOn();
      }
    });
  }
  static offGroup(groupName) {
    Object.values(Home[groupName]).forEach((i) => {
      if (i instanceof Device) {
        i.powerOff();
      }
    });
  }
}

class Light extends Device {
  #brightness;
  constructor(name) {
    super(name);
    this.#brightness = 40;
  }
  static addNewLight(newName) {
    Home.allLights[newName] = new Light(newName);
  }
  static removeLight(name) {
    delete Home.allLights[name];
  }
  get brightness() {
    return this.#brightness;
  }
  set brightness(value) {
    if (value >= 0 && value <= 100) {
      this.#brightness = value;
    }
  }
}

const devicesList = document.querySelector(".main__devlist");
let lightForRm;

function renderLights() {
  const lights = Object.values(Home.allLights);

  for (let i = 0; i < lights.length; i++) {
    const light = lights[i];

    // Create device card
    const deviceCard = document.createElement("div");
    deviceCard.classList.add("device-card", "frame-inner");

    // Create device main section
    const deviceMain = document.createElement("div");
    deviceMain.classList.add("device-card__main");

    // Create power switch
    const powerSwitchLabel = document.createElement("label");
    powerSwitchLabel.classList.add("switch");
    const powerSwitchInput = document.createElement("input");
    powerSwitchInput.type = "checkbox";
    powerSwitchInput.checked = light.power === "on";
    const powerSwitchSpan = document.createElement("span");
    powerSwitchSpan.classList.add("slider", "round");
    powerSwitchLabel.appendChild(powerSwitchInput);
    powerSwitchLabel.appendChild(powerSwitchSpan);
    deviceMain.appendChild(powerSwitchLabel);

    // Create device name
    const deviceName = document.createElement("h2");
    deviceName.classList.add("device-card__name");
    deviceName.textContent = `${light.name} (${light.power})`;
    deviceMain.appendChild(deviceName);

    // Append device main section
    deviceCard.appendChild(deviceMain);

    // Create device parameters section
    const deviceParams = document.createElement("div");
    deviceParams.classList.add("device-card__params");

    // Create brightness control
    const brightnessInput = document.createElement("input");
    brightnessInput.type = "range";
    brightnessInput.min = 0;
    brightnessInput.max = 100;
    brightnessInput.value = light.brightness;
    brightnessInput.classList.add("slider-dim");
    brightnessInput.id = `light-dim-${i}`;
    const brightnessLabel = document.createElement("p");
    brightnessLabel.textContent = "Brightness";
    deviceParams.appendChild(brightnessInput);
    deviceParams.appendChild(brightnessLabel);

    // Append device parameters section
    deviceCard.appendChild(deviceParams);

    // Append device card to device list
    devicesList.appendChild(deviceCard);

    // Add event listener for power switch
    powerSwitchInput.addEventListener("change", () => {
      light.powerSwitch();
      deviceName.textContent = `${light.name} (${light.power})`;
      deviceName.classList.toggle("on");
    });

    // Add event listener for brightness control
    brightnessInput.addEventListener("input", () => {
      light.brightness = parseInt(brightnessInput.value);
    });

    deviceName.addEventListener("click", () => {
      light.rename(prompt('Enter new name:'));
      deviceName.textContent = `${light.name} (${light.power})`;
    });

    deviceCard.addEventListener("click", () => {
      deviceCard.classList.toggle("current");
      lightForRm = `${light.name}`;
    });
  }
}

function addNewLight() {
    Light.addNewLight(prompt('Enter new name:'));
    devicesList.innerHTML = "";
    renderLights()
}

function remLight() {
  Light.removeLight(lightForRm);
  devicesList.innerHTML = "";
  renderLights();
}

const groupList = document.querySelector(".main__grouplist");
let groupForRm;

export { Home, Group, Light, renderLights, addNewLight, remLight };
