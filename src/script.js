'use strict';
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const totalScore0 = document.querySelector('#score--0');
const totalScore1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
let totalScores = [0, 0];
let currentScores = [0, 0];
let currentDice;
let currentPlayer = 0; // if 0 player 1 turn, if 1 player 2 turn
let playTheGame = true;
function displayTotalScore() {
  totalScore0.textContent = totalScores[0];
  totalScore1.textContent = totalScores[1];
}

function displayCurrentScore() {
  currentScore0.textContent = currentScores[0];
  currentScore1.textContent = currentScores[1];
}

function reverseTurn() {
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
  currentScores[0] = currentScores[1] = 0;
  currentPlayer = 1 - currentPlayer;
}

// initializing the game
function initializeGame() {
  console.log('initialize');
  playTheGame = true;
  totalScores[0] = totalScores[1] = currentScores[0] = currentScores[1] = 0;
  displayCurrentScore();
  displayTotalScore();
  currentPlayer = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  dice.classList.add('hidden');
}
btnNew.addEventListener('click', initializeGame);

initializeGame();
// rolling the dice
function rollingDice() {
  if (playTheGame) {
    currentDice = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `../images/dice-${currentDice}.png`;
    if (currentDice === 1) {
      currentScores[currentPlayer] = currentScores[1 - currentPlayer] = 0;
      displayCurrentScore();
      reverseTurn();
    } else {
      currentScores[currentPlayer] += currentDice;
      displayCurrentScore();
    }
  }
}
btnRoll.addEventListener('click', rollingDice);

// holding the turn
function holdDice() {
  if (playTheGame) {
    totalScores[currentPlayer] += currentScores[currentPlayer];
    displayTotalScore();
    if (totalScores[currentPlayer] >= 10) {
      console.log(`Player--${currentPlayer + 1} is the winner`);
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      playTheGame = false;
    } else {
      reverseTurn();
      displayCurrentScore();
    }
  }
}

btnHold.addEventListener('click', holdDice);
