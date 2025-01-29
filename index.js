const form = document.querySelector('#form');
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const button = document.querySelector('.button');


form.addEventListener('submit', addTask);

button.addEventListener('click', () => {
    localStorage.clear();
});


function addTask(event) {
    // Отменяем перезагрузку страницы при отправке формы
    event.preventDefault();
    // Достаем текст задачи из поля ввода
    const textYear = year.value;
    const textMonth = month.value;
    const textDays = days.value;
    const textHours = hours.value;
    const textMinutes = minutes.value;
    const textSeconds = seconds.value;

    function saveLocalStorage() {
        localStorage.setItem('year', JSON.stringify(textYear));
        localStorage.setItem('month', JSON.stringify(textMonth));
        localStorage.setItem('days', JSON.stringify(textDays));
        localStorage.setItem('hours', JSON.stringify(textHours));
        localStorage.setItem('minutes', JSON.stringify(textMinutes));
        localStorage.setItem('seconds', JSON.stringify(textSeconds));
    }

    saveLocalStorage();

    // Очищаем поле ввода и перемешаем на него фокус
    // days.value = "";
    // days.focus();
}


function upDaterTimer() {

    const textYear = JSON.parse(localStorage.getItem('year'));
    const textMonth = JSON.parse(localStorage.getItem('month'));
    const textDays = JSON.parse(localStorage.getItem('days'));
    const textHours = JSON.parse(localStorage.getItem('hours'));
    const textMinutes = JSON.parse(localStorage.getItem('minutes'));
    const textSeconds = JSON.parse(localStorage.getItem('seconds'));

    let month

    if ( textMonth == 'январь') { month = 0 };
    if (textMonth == 'февраль') { month = 1 };
    if (textMonth == 'март') { month = 2 };
    if (textMonth == 'апрель') { month = 3 };
    if (textMonth == 'май') { month = 4 };
    if (textMonth == 'июнь') { month = 5 };
    if (textMonth == 'июль') { month = 6 };
    if (textMonth == 'август') { month = 7 };
    if (textMonth == 'сентябрь') { month = 8 };
    if (textMonth == 'октябрь') { month = 9 };
    if (textMonth == 'ноябрь') { month = 10 };
    if (textMonth == 'декабрь') { month = 11 };


    const data = new Date(textYear, month, textDays, textHours, textMinutes, textSeconds, 0)
    const nowDate = new Date();

    const timeDifferens = nowDate - data;

    const days = Math.floor(timeDifferens / 1000 / 60 / 60 / 24)
    const hours = Math.floor(timeDifferens % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const minutes = Math.floor(timeDifferens % (1000 * 60 * 60) / (1000 * 60))
    const seconds = Math.floor(timeDifferens % (1000 * 60) / (1000))

    const daysM = document.querySelector('.timer__days');
    daysM.innerText = days;
    const hoursM = document.querySelector('.timer__hours');
    hoursM.innerText = hours;
    const minutesM = document.querySelector('.timer__minutes');
    minutesM.innerText = minutes;
    const secondsM = document.querySelector('.timer__seconds');
    secondsM.innerText = seconds;
}


setInterval(() => {
    upDaterTimer();
}, 1000);