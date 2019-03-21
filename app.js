/*jshint esversion: 6 */

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes.
 Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost.
 After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
 After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// setting global variables
let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let gamePlaying = true;

// refactored -- call the new game function
newGame();

/* adding a event listener so when the user clicks the btn-roll button
  element the dice will pick a random number from 1 - 6 and display that image
*/


// when the user clicks the roll btn
document.querySelector('.btn-roll').addEventListener('click', function () {
  if(gamePlaying) {
    // 1. Random Number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the results
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score IF the rolled number is not 1
    if (dice > 1) {
      // add score
      roundScore += dice;

      // the current id will display the roundScore
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
      else {
        // next player
        nextPlayer();
      }
  }

});

// when the user clicks the hold btn
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // add current score to global scores
    scores[activePlayer] += roundScore;

    // update the user interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }
    else {
        nextPlayer();
    }
  }

  // change player after Hold
});

// new game functionality
document.querySelector('.btn-new').addEventListener('click', newGame);

// function to jump to the next player
function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
    roundScore = 0;
  }

  // go back to player 1 (active player 0)
  else {
    activePlayer = 0;
    roundScore = 0;
  }
  // reset the current box to 0

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle the active class to and from player 1 and 2
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
  }

  // initalize the GAME
  function newGame() {
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    // the dice does not appear at the beginning
    document.querySelector('.dice').style.display = 'none';

    // setting the score and current value of both players to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

  }
