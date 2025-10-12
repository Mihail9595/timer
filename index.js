const form = document.querySelector("#form");
const date = document.querySelector("#date");
const desc = document.querySelector("#desc-top");
// const button = document.querySelector(".button");
const wrapper = document.querySelector(".wrapper");

form.addEventListener("submit", addTask);

// button.addEventListener("click", () => {
//   localStorage.clear();
//   wrapper.style.display = "none";
// });

const dateArray = JSON.parse(localStorage.getItem("date")) || [];

function addTask(event) {
  // Отменяем перезагрузку страницы при отправке формы
  event.preventDefault();
  // Достаем текст задачи из поля ввода
  const textDate = date.value;
  const textDesc = desc.value;

  if (!textDate || !textDesc) return;

  const objData = {
    id: new Date().getTime(),
    textDate,
    textDesc,
  };

  dateArray.push(objData);

  localStorage.setItem("date", JSON.stringify(dateArray));

  desc.value = "";
  date.value = "";
}

function upDaterTimer() {
  const dataArr = JSON.parse(localStorage.getItem("date"));

  wrapper.innerHTML = "";
  
  if (!dataArr || dataArr.length === 0) return;;
  

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
