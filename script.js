const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notfication = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figuerParts = document.querySelectorAll('.figure-part');

const words = ['programming' , 'wizard' , 'interface' , 'application'];

let selectedWord = words [Math.floor(Math.random() * words.length)];

const correctedLetters = [];
const wrongLetters = [];

// Show corrected word

function displayWord(){
    wordEl.innerHTML = `
        ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correctedLetters.includes(letter) ? letter : ''}
            </span>
        `).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    
    if (selectedWord === innerWord) {
        finalMessage.innerText='CONGRATULATION! YOU HAVE WON';
        popup.style.display = 'flex';
    }
    
}

//update the wrong letter
function updateWrongLetterEl(){
    //display wrong letters 
    wrongLettersEl.innerHTML=`
    ${wrongLetters.length >0 ? `<p>wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //show parts
    figuerParts.forEach((part, index) => {
        const error = wrongLetters.length;

        if(index < error){
            part.style.display = 'block';
        }else {
            part.style.display= 'none';
        }
    });

    //check if lost 
    if (wrongLetters.length === figuerParts.length){
        finalMessage.innerText= 'YOU HAVE LOST';
        popup.style.display = 'flex';
    }
}

//show notification
function showNotification(){
    notfication.classList.add('show');

    setTimeout(() => {
        notfication.classList.remove('show')
    }, 1000) 
}

//keydown letter press

window.addEventListener ('keydown', e => {

    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctedLetters.includes(letter)){
                correctedLetters.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterEl();
            }else {
                showNotification();
            }
        }
    }
})

// restart game 
playAgainBtn.addEventListener('click', () => {
    //empty arrays
    correctedLetters.splice(0);
    wrongLetters.splice(0); 

    selectedWord = words [Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterEl();

    popup.style.display = 'none'
})

displayWord();