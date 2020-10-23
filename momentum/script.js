const time = document.querySelector('#time');
const greeting = document.querySelector('#greeting');
const name = document.querySelector('#name');
const focus = document.querySelector('#focus');
const dayMonth = document.querySelector('#day');
const btnChangePic = document.querySelector('#btnChangePic');
let currentHour = new Date().getHours();
let currentHourChange = currentHour;
setBgGreet(currentHour);
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('#btnQuote');
const appID = '8e1eecd6fc68b8490908497ecf8ca301';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const humidity = document.querySelector('.weather-humidity');
const wind = document.querySelector('.weather-wind');
const error = document.querySelector("#error");


function showTime () {
  let today = new Date(),
    date = today.getDate(),
    day = today.getDay(),
    month = today.getMonth(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  function dayOfWeek (day){
    switch (day) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        return 'Sunday'
    }
  }

  function setMonth (month) {
    switch (month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      default:
        return 'December';
    }
  }
  dayMonth.innerHTML = `${dayOfWeek(day)}, ${date} ${setMonth(month)}`;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  if (hour > currentHour){
    currentHour = hour;
    setBgGreet(currentHour);
  }

  setTimeout(showTime, 1000)
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0': '') + n ;
}

function setBgGreet(hour) {
  if (hour < 6){
    document.body.style.backgroundImage = `url("assets/images/${hour}.jpg")`;
    greeting.textContent = 'Good Night';
    document.body.style.color ='white';
  }
  else if( hour < 12){
    document.body.style.backgroundImage = `url("assets/images/${hour}.jpg")`;
    greeting.textContent = 'Good Morning';
  }
  else if (hour < 18){
    document.body.style.backgroundImage = `url('assets/images/${hour}.jpg')`;
    greeting.textContent = 'Good Afternoon';
  }
  else if(hour < 24){
    document.body.style.backgroundImage = `url("assets/images/${hour}.jpg")`;
    greeting.textContent = 'Good Evening';
    document.body.style.color ='white';
  }
}

function changeBgImg() {
  currentHourChange = currentHourChange === 23 ? 0 : currentHourChange + 1;
  document.body.style.backgroundImage = `url("assets/images/${currentHourChange}.jpg")`;
}

function setName(e) {
  const value = e.target.innerText;
  if(value.length > 0 )
    localStorage.setItem('name', value);
  else
    getName();
}

function setFocus(e) {
  const value = e.target.innerText;
  if(value.length > 0 )
    localStorage.setItem('focus', value);
  else
    getFocus();
}



function getName() {
  if (localStorage.getItem('name') === null){
    name.textContent = '[Enter Name]';
  }
  else {
    name.textContent = localStorage.getItem('name')
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null){
    focus.textContent = '[Enter Focus]';
  }
  else {
    focus.textContent = localStorage.getItem('focus')
  }
}

function renderName(value) {
  name.textContent = value ? value : '';
}

function renderFocus(value) {
  focus.textContent = value ? value : '';
}

async function getQuote() {
  const url = `https://type.fit/api/quotes`;
  const res = await fetch(url);

  return await res.json();
}

let quotes;
let currentQuote = getRandomInt(1000);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function changeQuote(){
  if (currentQuote >= quotes.length - 1){
    currentQuote = 0;
  }
  const quote = quotes[currentQuote];
  currentQuote++;

  blockquote.textContent = quote.text;
  figcaption.textContent = quote.author;
}

//Get weather

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=${appID}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if(res.status !== 200){
    error.textContent = data.message;
    city.textContent = localStorage.getItem('city');
    return false;
  }

  error.textContent = '';
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent =`Wind: ${Math.round(data.wind.speed)} m/c`;
  return true;
}


async function setCityToLS(e) {
  const value = e.target.innerText;
  if(value.length > 0 && await getWeather())
    localStorage.setItem('city', value);
  else
    getCity();
}

function setCity(event) {
  if (event.code === 'Enter') {
    city.blur();
  }
}

function renderCity(value) {
  city.textContent = value ? value : '';
}

function getCity() {
  if (localStorage.getItem('city') === null){
    city.textContent = '[Enter city]';
  }
  else {
    city.textContent = localStorage.getItem('city')
  }
}

name.addEventListener('keypress', (e) => {
  if(e.which === 13) name.blur();
});
name.addEventListener('blur', setName);
name.addEventListener('focus', () => {
  renderName('');
});


focus.addEventListener('keypress', (e) => {
  if(e.which === 13) focus.blur();
});
focus.addEventListener('blur', setFocus);
focus.addEventListener('focus', () => {
  renderFocus('');
});

city.addEventListener('keypress', (e) => {
  if(e.which === 13) city.blur();
});

city.addEventListener('blur', setCityToLS);
city.addEventListener('focus', () => {
  renderCity('');
});


btnChangePic.addEventListener('click', changeBgImg);
btnQuote.addEventListener('click', changeQuote);


showTime();
getName();
getFocus();
getCity();

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

document.addEventListener('DOMContentLoaded', async () => {
  quotes = await getQuote();
  changeQuote();
});
