const Home = {
  allLights: {
    name: 'All lights in the house'
  },
  allAirConds: {
    name: 'All air conditioners in the house'
  },
  allHeaters: {
    name: 'All heaters in the'
  },
};

class Device {
  #power;
  constructor(name) {
    this.name = name;
    this.#power = "on";
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
  static switchPowerGroup(groupName) {
    Home[groupName].powerSwitch();
    Object.values(Home[groupName]).forEach((i) => {
      if (i instanceof Device) {
        i.powerSwitch();
      }
    });
  }
}

class Group extends Device {
  constructor(name) {
    super(name);
  }
  static addNewGroup(gr, newName) {
    gr[newName] = new Group(newName);
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
    if (newName) { Home.allLights[newName] = new Light(newName); }
  }
  static removeLight(name) {
    if (name) { delete Home.allLights[name]; } 
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

export { Home, Device, Group, Light };
