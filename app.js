const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeBtn = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const board = document.getElementById('board');
const colors = ['#D2691E', '#F4A460', '#CD853F', '#191970', '#000080', '#FAEBD7', '#000000'];
const sound = document.createElement('audio');
const missed = document.createElement('audio');
sound.src = './sound.mp3';
missed.src = './missed.mp3';

var selectedTime = 0;
let time = 0;
let score = document.querySelector('#score span');

startBtn.addEventListener('click', (event) =>{
  event.preventDefault();
  screens[0].classList.add('up');
})

timeBtn.addEventListener('click', event => {
  if(event.target.classList.contains('time-btn')){
    time = parseInt(event.target.getAttribute('data-time'));
    selectedTime = time;
    screens[1].classList.add('up');
    startGame();
  }
})


board.addEventListener('click', event => {
  if(event.target.classList.contains('circle')){
    score.innerText = Number(score.innerText)+1;
    sound.play();
    event.target.remove();
    createRandomTarget();
    score.style.color = "green";
  } else {
    score.innerText = Number(score.innerText)-1;
    missed.play();
    score.style.color = "red";
  }
})

document.addEventListener('keydown', function(event){
  if(event.key === 'Escape'){
   timeEl.classList.remove('lastSeconds', 'blink');
   clearInterval(window.timer);
   backToMainMenu();
  }
})

function startGame() {
  window.timer = setInterval(decreaseTime, 1000);
  score.innerHTML ='0';
  createRandomTarget();
  setTime(time);
}

function decreaseTime(){
  if(time === 0){
    finishGame();
  } else {
    let current = --time;
  if (current < 10){
    current = `0${current}`;
    timeEl.classList.add('lastSeconds', 'blink');
  }
  setTime(current);
  }
}

function setTime (value){
  timeEl.innerHTML = `00:${value}`;
}

function finishGame(){
  timeEl.classList.remove('lastSeconds', 'blink');
  timeEl.parentNode.classList.add('hide');
  scoreEl.classList.add('hide');
  clearInterval(window.timer);
  selectedTime = 0;
  board.innerHTML = `<div class="end-game">
  <div class="final-score">
    <h1>Счёт:</h1>
    <span class="primary">${score.innerText}</span>
</div>
  <button class="main-menu" onclick="backToMainMenu()">Главное меню<span class="flare"></span></button>
</div>
</div>`;
}

function createRandomTarget(){
  const circle = document.createElement('div');
  const size = getRandomNumber(8, 60);

  const {width,height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  
  setColor(circle);
  board.append(circle);  
}

function getRandomNumber(min, max) {
  return Math.random() * (max-min) + min
}

function setColor(element){
  const color = getRandomColor();
  element.style.backgroundColor = color;
}

function getRandomColor(){
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function backToMainMenu(){
  screens.forEach(screen => screen.classList.remove('up'))
  board.innerHTML = '';
  timeEl.parentNode.classList.remove('hide');
  scoreEl.classList.remove('hide');
}



