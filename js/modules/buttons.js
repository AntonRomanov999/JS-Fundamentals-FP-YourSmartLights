import {
  addNewLight,
  remLight,
  regenLists,
  createGroup,
  delGroup
} from "./light-functions.js";
import { giveAllGroups, sheduleAction, switchGroup } from "./light-auto.js";
import { Home, Group, Light, Device } from "./devices.js";
import { renderAir, addNewAir, removeAir, autoAir } from "./air.js";

const btns = [...document.getElementById("sections").children];
const tabs = [...document.getElementsByClassName("main__section")];

const addBtn = document.getElementById("add");
const delBtn = document.getElementById("del");
let tabAct = 'light';

function changeTab() {
  btns[0].classList.add("active");
  document.getElementById(`${btns[0].innerText}`).classList.add("active");

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      btns.forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      if (this.textContent === "Groups") {
        addBtn.style.display = "inline-block";
        delBtn.style.display = "inline-block";
        addBtn.textContent = "Create new group";
        delBtn.textContent = "Delete group";
        tabAct = 'group';
        console.log(tabAct);
      } else if (this.textContent === "Devices") {
        addBtn.style.display = "inline-block";
        delBtn.style.display = "inline-block";
        addBtn.textContent = "Add new light";
        delBtn.textContent = "Remove light";
        tabAct = 'light';
        console.log(tabAct);
      } else if (this.textContent === "Options") {
        addBtn.style.display = "none";
        delBtn.style.display = "none";
        giveAllGroups();
      }
      tabs.forEach((sect) => {
        sect.classList.remove("active");
      });
      document.getElementById(`${this.innerText}`).classList.add("active");
      regenLists();
    });
  }
}

addBtn.addEventListener("click", () => {
  if (tabAct === 'light') {
    addNewLight();
  } else if (tabAct = 'group') createGroup()
}); 
delBtn.addEventListener("click", () => {
  if (tabAct === 'light') {
    remLight();
  } else if (tabAct = 'group') delGroup()
});

function showDetails() {
  const arrowBtn = document.querySelector(".btn-arrow");
  const details = document.querySelector(".info__details");
  arrowBtn.addEventListener("click", () => {
    details.classList.toggle("active");
    arrowBtn.classList.toggle("active");
  });
}

const shedBtnUser = document.getElementById("user-shedule");
const shedBtnSun = document.getElementById("sun-shedule");
shedBtnUser.addEventListener("click", () => {
  sheduleAction('user');
});
shedBtnSun.addEventListener("click", () => {
  sheduleAction('sun');
});

const add_BtnAC = document.getElementById("add-air");
const del_BtnAC = document.getElementById("del-air");
add_BtnAC.addEventListener("click", () => addNewAir());
del_BtnAC.addEventListener("click", () => removeAir());

const airAutoBtn = document.getElementById("air-auto");
airAutoBtn.addEventListener("click", () => { 
  autoAir('auto');  
});

const airOffBtn = document.getElementById("air-off");
airOffBtn.addEventListener("click", () => { 
  autoAir('off');  
});

export { changeTab, showDetails };
