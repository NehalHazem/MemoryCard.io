// ------------------------------------------ Header

let sec_val = 0;
let min_val = 0;
let interval;
let timeOn = false;  // time isn't started yet

const second = document.getElementById('seconds'),
      minute = document.getElementById('minutes'),
      playBtn = document.querySelector('.play'),
      pauseBtn = document.querySelector('.pause');  



function countUp() {
    sec_val ++;
    if (sec_val > 59) {
        sec_val = 0;
        min_val ++;
    }

    if (sec_val < 10) {
        second.innerText = '0' + sec_val;
    } else {
        second.innerText = sec_val;
    }

    if (min_val < 10) {
        minute.innerText = '0' + min_val;
    } else {
        minute.innerText = min_val;
    } 
}

// Count up starts after 1s from pressing start
function startWhen() {
    interval = setInterval(countUp, 1000);
}

function start() {
    clearInterval(interval);
    startWhen();
    playBtn.classList.add('clicked');
    pauseBtn.classList.remove('clicked');
    lockBoard = false;
    timeOn = true;
}

function pause() {
    clearInterval(interval);
    pauseBtn.classList.add('clicked');
    playBtn.classList.remove('clicked');
    lockBoard = true;
    timeOn = false;
}

// ------------------------------------------ Cards

const cards = document.querySelectorAll('.memory-card');
let cardsNum = document.getElementsByClassName('matched');
let hasFlippedCard = false;   // false = firstCard , true = secondCard
let lockBoard = false;   // false => allow flipping card
let firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    if (lockBoard) return;   // is false allow flipping

    if (this === firstCard) return;

    this.classList.add('flip');
    // console.log(this);  // the clicked card.
    
    if (!hasFlippedCard) {
        // firstCard
        hasFlippedCard = true;
        firstCard = this;   // this => it return the card that been flipped
        
    } else {
        // secondCard
        hasFlippedCard = false;
        secondCard = this;
        
        // Check if first & second cards matches 
        checkForMatch();
        // Check if the game end to pause the time
        checkEndGame();
        
    }   
}

function checkForMatch () {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        lockBoard = false;
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
    } else {
        lockBoard = true;
        setTimeout( () => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            lockBoard = false;
        }, 1500);
    }
}

(function shuffle() {
    cards.forEach(card => {
        let randomCards = Math.floor(Math.random()*12);    // returns a random integer between 0 and 12 (both included)
        card.style.order = randomCards;
    });
})();

function checkEndGame() {
    if (cardsNum.length === 12) {
        clearInterval(interval);
        setTimeout( () => {
            // alert('Congrats! you did it in ' + min_val +' min and '+ sec_val +' sec');
            document.querySelector('.not').innerHTML = 'Congrats! you did it in ' + min_val +' min and '+ sec_val +' sec';
            document.querySelector('.not').style.display = 'block';
        }, 500);
        playBtn.disabled = true;
        pauseBtn.disabled = true;
    }
}

// lock board untill the time starts
window.addEventListener('load', () => {
    lockBoard = true;
});

window.addEventListener('click', () => {
    console.log(timeOn);
    if (!timeOn) {
        document.querySelector('.not2').style.display = 'block';
    } else {
        document.querySelector('.not2').style.display = 'none';
    }
})