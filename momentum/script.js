const time = document.querySelector('#time');
const greeting = document.querySelector('#greeting');
const name = document.querySelector('#name');
const focus = document.querySelector('#focus');
const dayMonth = document.querySelector('#day');
const btnChangePic = document.querySelector('#btnChangePic');
let currentHour = new Date().getHours();
let currentHourChange = currentHour;
setBgGreet(currentHour);

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
        return 'Понедельник';
      case 2:
        return 'Вторник';
      case 3:
        return 'Среда';
      case 4:
        return 'Четверг';
      case 5:
        return 'Пятница';
      case 6:
        return 'Суббота';
      default:
        return 'Воскресение'
    }
  }

  function setMonth (month) {
    switch (month) {
      case 0:
        return 'января';
      case 1:
        return 'февраля';
      case 2:
        return 'марта';
      case 3:
        return 'апреля';
      case 4:
        return 'мая';
      case 5:
        return 'июня';
      case 6:
        return 'июля';
      case 7:
        return 'августа';
      case 8:
        return 'сентября';
      case 9:
        return 'октября';
      case 10:
        return 'ноября';
      default:
        return 'декабря';
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

function changeBgImg(e) {
  currentHourChange = currentHourChange === 23 ? 0 : currentHourChange + 1;
  document.body.style.backgroundImage = `url("assets/images/${currentHourChange}.jpg")`;
}


function setName(e) {
  if (e.type === 'keypress'){
    if (e.which === 13){
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  }
  else {
    localStorage.setItem('name', e.target.innerText)
  }
}


function setFocus(e) {
  if (e.type === 'keypress'){
    if (e.which === 13){
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  }
  else {
    localStorage.setItem('focus', e.target.innerText)
  }
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

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

btnChangePic.addEventListener('click', changeBgImg);

showTime();
getName();
getFocus();
