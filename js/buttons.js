const btns = [...document.getElementById("sections").children];
const sects = [...document.getElementsByClassName("main__section")];
const defaultActive = "Devices";

btns[0].classList.add("active");
document.getElementById(`${btns[0].innerText}`).classList.add("active");

for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");
    sects.forEach((sect) => {
      sect.classList.remove("active");
    });
    document.getElementById(`${this.innerText}`).classList.add("active");
  });
}


