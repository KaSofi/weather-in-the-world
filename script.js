const api = {
    endpoint: 'https://api.openweathermap.org/data/2.5/', //просто копируем часть ссылки
    key: '317bff60cc76ff6413ff40d8283269c9' // ключ (отправили нв почту после регистрации на сайте)
}

const input = document.querySelector('#input');
input.addEventListener('keypress', enter);


function enter (e) {
    if (e.keyCode === 13) {
        getInfo(input.value); //получаем доступ к тому, что пользователь напишет в строке input
    }
}
//эта функция отвечает за поиск города:
async function getInfo(data) { 
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}&lang=ru`);
    const result = await res.json();
    displayResult(result);
    input.value = '';
    
    
//эта функция отвечает за результат, который отображается в приложении:
function displayResult(result) {
    let city = document.querySelector('#city');
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate();

    let temperature = document.querySelector('.temperature');
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>° С</span>`;

    setTemperature(result.main.temp); //в параметре прописываем саму цифру и ее путь, что бы присвоить класс для изменения цвета класса при минусовой температуре

    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML = 'Ощущается как: ' + `${Math.round(result.main.feels_like)}<span>° С</span>`;
    let conditions = document.querySelector('#conditions');
    conditions.textContent = `${result.weather[0].description}`;
    let variation = document.querySelector('#variation');
    variation.innerHTML = 'Min: ' + `${Math.round(result.main.temp_max)}<span>° С</span>` + ' ' + 'Max: ' + `${Math.round(result.main.temp_min)}<span>° С</span>`;
    
}
}
        // если температура ниже 0, то цвет меняется на синий:
function setTemperature(temp) {
    if (temp < 0) {
        let temperature = document.querySelector('.temperature');
        temperature.classList.add('cold');
    }
    else { // отменяем класс, если событие произощло (что бы после первого минуса температура всегда не была синего цвета)
        let temperature = document.querySelector('.temperature');
        temperature.classList.remove('cold');
    }
}

function getOurDate() {
    const myDate = new Date();
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    let time = myDate
    let week = days[myDate.getDay()]; 
    let day = myDate.getDate();
    let month = months[myDate.getMonth()];
    let year = myDate.getFullYear();
    // const hour = myDate.getHours();
    // const minutes = myDate.getMinutes();
    // const timeEl = document.querySelector('.timeSet').innerHTML = `${hour} : ${minutes}`;

    const fullDate = document.querySelector('#data').textContent = `${week} , ${day} ${month} , ${year} `;
}


    
    getInfo('Moscow,ru'); // вызываем функцию, что бы при загрузке страницы открывалась погода в Москве
