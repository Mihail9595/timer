import { upDaterTimer } from "../main.js";

const modalChange = document.querySelector(".modal-change");
const cancelButton = document.querySelector(".cancel");
const title = document.querySelector(".titleDescChange");
const input = document.querySelector("#desc-top-change");
const input1 = document.querySelector("#date1");
const form = document.querySelector("#form1");

export function changeTask(e) {
  if (e.target.classList.contains("changeButton")) {
    modalChange.style.display = "block";

    const dateId = e.target.getAttribute("data-id");
    const date = JSON.parse(localStorage.getItem("date")) || [];
    const objDate = date.find((date) => date.id === parseInt(dateId));
    title.innerHTML = `Изменить событие: ${objDate.textDesc}`;
    input.value = objDate.textDesc;
    input1.value = objDate.textDate;

    form.addEventListener("submit", (e) => {
      let textDesc = input.value;
      let textDate = input1.value;
      const newObj = {
        id: Number(dateId),
        textDate,
        textDesc,
        decrease: objDate.decrease,
      };

      const date1 = date.filter((date) => date.id !== parseInt(dateId));
      date1.push(newObj);

      localStorage.setItem("date", JSON.stringify(date1));
      upDaterTimer();
    });
  }

  cancelButton.addEventListener("click", () => {
    modalChange.style.display = "none";
  });
}
