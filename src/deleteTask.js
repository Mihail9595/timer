import { upDaterTimer } from "../main.js";

export function deleteTask(e) {
  if (e.target.classList.contains("deleteButton")) {
    const dateId = e.target.getAttribute("data-id");
    const date = JSON.parse(localStorage.getItem("date")) || [];
    const dateNew = date.filter((date) => date.id != dateId);
    localStorage.setItem("date", JSON.stringify(dateNew));
    upDaterTimer();
  }
}
