const time = document.querySelector('#time');
const greeting = document.querySelector('#greeting');
const name = document.querySelector('#name');
const focus = document.querySelector('#focus');
const input = document.querySelector("input");


function showTime () {
  let today = new Date(),
    day = today.getDay(),
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


  time.innerHTML = `${dayOfWeek(day)} ${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000)
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0': '') + n ;
}

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 6){
    document.body.style.backgroundImage = 'url("assets/images/night/01.jpg")';
    greeting.textContent = 'Good Night';
    document.body.style.color ='white';
  }
  else if( hour < 12){
    document.body.style.backgroundImage = 'url("assets/images/morning/01.jpg")';
    greeting.textContent = 'Good Morning';
  }
  else if (hour < 18){
    document.body.style.backgroundImage = "url('assets/images/day/02.jpg')";
    greeting.textContent = 'Good Afternoon';
  }
  else if(hour < 24){
    document.body.style.backgroundImage = 'url("assets/images/evening/01.jpg")';
    greeting.textContent = 'Good Evening';
    document.body.style.color ='white';
  }
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

showTime();
setBgGreet();
getName();
getFocus();
