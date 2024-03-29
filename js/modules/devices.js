const Home = {
  allLights: {
    name: "All lights in the house",
  },
  allAirs: {
    name: "All air conditioners in the house",
  }
};

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
    if (!newName) {
      this.name = this.name;
    } else this.name = newName;
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
  static switchPowerGroup(groupName) {
    Home[groupName].powerSwitch();
    Object.values(Home[groupName]).forEach((i) => {
      if (i instanceof Device) {
        i.powerSwitch();
      }
    });
  }
  static onPowerGroup(groupName) {
    Home[groupName].powerOn();
    Object.values(Home[groupName]).forEach((i) => {
      if (i instanceof Device) {
        i.powerOn();
      }
    });
  }
  static offPowerGroup(groupName) {
    Home[groupName].powerOff();
    Object.values(Home[groupName]).forEach((i) => {
      if (i instanceof Device) {
        i.powerOff();
      }
    });
  }
}

class Group extends Device {
  constructor(name) {
    super(name);
  }
  static addNewGroup(gr, newName) {
    if (newName) {
      gr[newName] = new Group(newName);
    } 
  }
  static removeGroup(gr, name) {
    delete gr[name];
  }
}

class Light extends Device {
  #brightness;
  #colorTemp;
  constructor(name) {
    super(name);
    this.#brightness = 90;
    this.#colorTemp = 10;
  }
  static addNewLight(newName) {
    if (newName) {
      Home.allLights[newName] = new Light(newName);
    }
  }
  static removeLight(name) {
    if (name) {
      delete Home.allLights[name];
    }
  }
  get brightness() {
    return this.#brightness;
  }
  set brightness(value) {
    if (value >= 0 && value <= 100) {
      this.#brightness = value;
    }
  }
  get colorTemp() {
    return this.#colorTemp;
  }
  set colorTemp(value) {
    if (value >= 0 && value <= 100) {
      this.#colorTemp = value;
    }
  }
}

class Air extends Device {
  #temp;
  #mainmode;
  #mode;
  #possiblemods;
  constructor(name) {
    super(name);
    this.#mainmode = 'cool';
    this.#mode = 'fan';
    this.#possiblemods = [ 'dry', 'fan', 'turbo', 'quiet' ];
    this.#temp = 22;
  }
  get mainmode() {
    return this.#mainmode;
  }
  set mainmode(value) {
    if (value === 'cool' || value === 'heat')
      this.#mainmode = value
  }
    get possiblemods() {
    return this.#possiblemods;
  }
  get mode() {
    return this.#mode;
  }
  set mode(value) {
    if (this.#possiblemods.includes(value))
      this.#mode = value;
  }
  get temp() {
    return this.#temp;
  }
  set temp(value) {
    if (value >= 16 && value <= 24) {
      this.#temp = value;
    }
  }
  static addNewAir(newName) {
    if (newName) {
      Home.allAirs[newName] = new Air(newName);
    }
  }
  static removeAir(name) {
    if (name) {
      delete Home.allAirs[name];
    }
  }
}

function saveSysData() {
  const dataLights = Object.values(Home.allLights).filter(
    (i) => i instanceof Light
  ).map(light => {
    return {
      type: 'Light',
      name: light.name,
      brightness: light.brightness,
      colorTemp: light.colorTemp,
      power: light.power
    };
  });

  const dataGroups = Object.values(Home).filter(
    (i) => i instanceof Group
  ).map(group => {
    return {
      type: 'Group',
      name: group.name,
    };
  });

  const allLights = [...dataLights, ...dataGroups];
  const allLightsString = JSON.stringify(allLights);

  localStorage.removeItem("allLights");
  localStorage.setItem("allLights", allLightsString);

}

function readSysData() {
  let allLightsSaved = JSON.parse(localStorage.getItem("allLights"));
  allLightsSaved.forEach(data => {
    if (data.type === 'Light') {
      let lightName = data.name;
      let lightBrightness = parseInt(data.brightness);
      let lightColorTemp = parseInt(data.colorTemp);
      let lightPower = data.power;
      if (!Home.allLights[lightName]) {
        Light.addNewLight(lightName);
      }
      Home.allLights[lightName].brightness = lightBrightness;
      Home.allLights[lightName].colorTemp = lightColorTemp;
      if (lightPower === 'on') {
        Home.allLights[lightName].powerOn();
      } else {
        Home.allLights[lightName].powerOff();
      }
    } else if (data.type === 'Group') {
      let groupName = data.name;
      if (!Home[groupName]) {
        Group.addNewGroup(Home, groupName);
      }
    }
  });
}



export { Home, Device, Group, Light, Air, readSysData, saveSysData};
