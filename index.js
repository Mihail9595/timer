const form = document.querySelector("#form");
const date = document.querySelector("#date");
const desc = document.querySelector("#desc-top");
const wrapper = document.querySelector(".wrapper");
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const title = modal.querySelector(".titleDesc");
const buttonModal = document.querySelector(".button-modal");

form.addEventListener("submit", addTask);

function addTask(event) {
  event.preventDefault();
  const dateArray = JSON.parse(localStorage.getItem("date")) || [];
  const textDate = date.value;
  const textDesc = desc.value;

  if (!textDate || !textDesc) return;

  let decrease = false;
  if (new Date(textDate).getTime() - new Date() > 0) {
    decrease = true;
  }

  const objData = {
    id: new Date().getTime(),
    textDate,
    textDesc,
    decrease,
  };

  dateArray.push(objData);

  localStorage.setItem("date", JSON.stringify(dateArray));

  desc.value = "";
  date.value = "";
}

function upDaterTimer() {
  const dataArr = JSON.parse(localStorage.getItem("date"));
  wrapper.innerHTML = "";

  if (!dataArr || dataArr.length === 0) return;

  dataArr.forEach((el) => {
    const data = new Date(el.textDate);
    const nowDate = new Date();
    const timeDifferens = Math.abs(data - nowDate);

    const days = Math.floor(timeDifferens / 1000 / 60 / 60 / 24);
    const hours = Math.floor(
      (timeDifferens % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifferens % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifferens % (1000 * 60)) / 1000);

    if (
      (days === 0 && hours === 0 && minutes === 0 && seconds === 0) ||
      (el.decrease && data - nowDate < 0)
    ) {
      title.innerHTML = `Событие: ${el.textDesc}`;
      modal.style.display = "block";
      buttonModal.setAttribute("data-id", el.id);
      closeModalBtn.setAttribute("data-id", el.id);
      setTimeout(() => {
        closeModalBtn.style.visibility = "visible";
      }, 2000);
    }

    const dateHtml = `
      <div class="wrapper-timer">

     <div class="desc-main">${el.textDesc}</div>

        <div class="timer">
         <div class="timer__days">${days}</div>
         <div class="timer__hours">${hours}</div>
         <div class="timer__minutes">${minutes}</div>
         <div class="timer__seconds">${seconds}</div>
       </div>

        <div class="desc">
          <div class="desc__days">дни</div>
          <div class="desc__hours">часы</div>
          <div class="desc__minutes">минуты</div>
          <div class="desc__seconds">секунды</div>
        </div>

        <button class="deleteButton" data-id="${el.id}">Удалить</button>
     </div>
     
   `;

    wrapper.innerHTML += dateHtml;
  });
}

setInterval(() => {
  upDaterTimer();
}, 1000);

wrapper.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteButton")) {
    const dateId = e.target.getAttribute("data-id");
    const date = JSON.parse(localStorage.getItem("date")) || [];
    const dateNew = date.filter((date) => date.id != dateId);
    localStorage.setItem("date", JSON.stringify(dateNew));
    upDaterTimer();
  }
});

closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
  const dateId = Number(closeModalBtn.getAttribute("data-id"));
  const date = JSON.parse(localStorage.getItem("date")) || [];
  const dateNew = date.map((date) => {
    if (date.id === dateId) {
      return { ...date, decrease: false };
    } else return date;
  });
  localStorage.setItem("date", JSON.stringify(dateNew));
}

// закрываем модальное окно по любому месту
window.addEventListener("click", (event) => {
  // элемент по которому кликнули
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

buttonModal.addEventListener("click", () => {
  const dateId = buttonModal.getAttribute("data-id");
  const date = JSON.parse(localStorage.getItem("date")) || [];
  const dateNew = date.filter((date) => date.id != dateId);
  localStorage.setItem("date", JSON.stringify(dateNew));
  modal.style.display = "none";
});
