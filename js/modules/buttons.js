function changeTab() {
  const btns = [...document.getElementById("sections").children];
  const tabs = [...document.getElementsByClassName("main__section")];

  btns[0].classList.add("active");
  document.getElementById(`${btns[0].innerText}`).classList.add("active");

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      btns.forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      tabs.forEach((sect) => {
        sect.classList.remove("active");
      });
      document.getElementById(`${this.innerText}`).classList.add("active");
    });
  }
}

function showDetails() {
  const arrowBtn = document.querySelector(".btn-arrow");
  const details = document.querySelector(".info__details");
  arrowBtn.addEventListener("click", () => { 
    details.classList.toggle("active"); 
    arrowBtn.classList.toggle("active");
  })
}



export { changeTab, showDetails };
