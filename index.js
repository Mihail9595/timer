const form = document.querySelector("#form");
const date = document.querySelector("#date");
const desc = document.querySelector("#desc-top");
const button = document.querySelector(".button");

form.addEventListener("submit", addTask);

button.addEventListener("click", () => {
  localStorage.clear();
    const daysM = document.querySelector(".timer__days");
  daysM.innerText = 0;
  const hoursM = document.querySelector(".timer__hours");
  hoursM.innerText = 0;
  const minutesM = document.querySelector(".timer__minutes");
  minutesM.innerText = 0;
  const secondsM = document.querySelector(".timer__seconds");
  secondsM.innerText = 0;
  const descMain = document.querySelector(".desc-main");
  descMain.innerText = "";
});

function addTask(event) {
  // Отменяем перезагрузку страницы при отправке формы
  event.preventDefault();
  // Достаем текст задачи из поля ввода
  const textDate = date.value;
  const textDesc = desc.value;

  function saveLocalStorage() {
    localStorage.setItem("date", JSON.stringify(textDate));
    localStorage.setItem("desc", JSON.stringify(textDesc));
  }

  saveLocalStorage();

  // Очищаем поле ввода и перемешаем на него фокус
  // days.value = "";
  // days.focus();
}

function upDaterTimer() {
  const textDate = JSON.parse(localStorage.getItem("date"));
  const textDesc = JSON.parse(localStorage.getItem("desc"));

  if (textDate === null) return;

  const data = new Date(textDate);
  const nowDate = new Date();

  const timeDifferens = Math.abs(data - nowDate);

  const days = Math.floor(timeDifferens / 1000 / 60 / 60 / 24);
  const hours = Math.floor(
    (timeDifferens % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifferens % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifferens % (1000 * 60)) / 1000);

  const daysM = document.querySelector(".timer__days");
  daysM.innerText = days;
  const hoursM = document.querySelector(".timer__hours");
  hoursM.innerText = hours;
  const minutesM = document.querySelector(".timer__minutes");
  minutesM.innerText = minutes;
  const secondsM = document.querySelector(".timer__seconds");
  secondsM.innerText = seconds;
  const descMain = document.querySelector(".desc-main");
  descMain.innerText = textDesc;
}

setInterval(() => {
  upDaterTimer();
}, 1000);
