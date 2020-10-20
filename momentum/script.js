const time = document.querySelector('#time');
const greeting = document.querySelector('#greeting');
const name = document.querySelector('#name');
const focus = document.querySelector('#focus');
let today = new Date();


const showAmPm = true;

function showTime () {
  let hour = today.getHours(),
    min = today.getMinutes(),
    sec= today.getSeconds();
  const amPm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000)
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0': '') + n ;
}

function setBgGreet() {
  let hour = today.getHours();
  if( hour < 12){
    document.body.style.backgroundImage = 'url("assets/images/morning/01.jpg")';
    greeting.textContent = 'Good Morning';
  }
  else if (hour < 18){
    document.body.style.backgroundImage = "url('assets/images/day/02.jpg')";
    greeting.textContent = 'Good Afternoon';
  }
  else {
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
