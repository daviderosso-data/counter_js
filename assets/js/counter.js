// definisco variabili e costanti

let negative = 0;
let neutral = 0;
let positive = 0;
let totalVotes = 0;
const centerBoxDiv = document.getElementById('centerBox');
const spashBox = document.getElementById('spashScreen');
const centerButton = document.createElement('div'); 

// ascolto i click sull'elemento reset e vado a richiamare la funzione resetVotes
document.getElementById('reset').addEventListener('click', resetVotes);

// aggiungo una funzione per disabilitare i pulsanti di voto dopo aver votato

function disableButton(time){
    const buttons = document.querySelectorAll('.button'); //seleziono tutti i pulsanti
    buttons.forEach(button => {
        button.disabled = true;
    });

    setTimeout (function(){
        buttons.forEach(function(button){
            button.disabled = false;
        }); },time);
}

// Funzione per la creazione dei pulsanti con immagine, alt text, e testo

function createButton(id, buttonText,imgSrc,imgAlt, parent) {
    const button = document.createElement('button'); 
    button.id = id; 
    button.className = 'button'; 
    button.innerHTML = `
        <img id="buttonImg" src="${imgSrc}" alt="${imgAlt}">
       <span id="buttonText"><br>${buttonText}</span>`;
    centerButton.appendChild(button); 
    return button; 
}

// creo la funzione di setup pe
function setupButtons() {
  
    centerButton.id = 'centerButton';
    centerBoxDiv.appendChild(centerButton); 

    const negativeButton = createButton('negative', 'Poco Soddisfatto','assets/img/buttons/sad.png','gatto triste', centerBoxDiv);
    const neutralButton = createButton('neutral', 'Non Male','assets/img/buttons/neutral.png','gatto neutrale', centerBoxDiv);
    const positiveButton = createButton('positive', 'Che spettacolo!','assets/img/buttons/happy.png','gatto felice', centerBoxDiv);

// ascolto i click sugli elementi con id negative,neutral,positive e vado a richiamare la funzione updateVotes e passo l'argomento corrispondente

    document.getElementById('negative').addEventListener('click', updateVotes('negative'));
    document.getElementById('neutral').addEventListener('click', updateVotes('neutral'));  
    document.getElementById('positive').addEventListener('click', updateVotes('positive')); 
}

// Inizializza i pulsanti al caricamento della pagina
document.addEventListener('DOMContentLoaded', setupButtons);

// creo un overlay per ringraziare quando si vota

function triggerOverlay() {
    const overlay = document.getElementById('overlayAnimation');
    overlay.style.display = 'flex';

    // setto il display a none dopo il timeout
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 2000);
}

// creo la funzione che si occuperà di aggiornare il voto
function updateVotes(type){
    if (type === 'negative') {negative++; totalVotes++;}//se l'argomento é negative aumento il counter di negative e il numero di voti totali
    else if( type === 'neutral') {neutral++; totalVotes++;} // se l'argomento é negative aumento il counter di neutral e il numero di voti totali
    else if( type === 'positive'){ positive++; totalVotes++;} // se l'argomento é positive aumento il counter di positive e il numero di voti totali
    updateDisplay(); // richiamo la funzione updateDisplay
    disableButton(5000); // disabilito i pulsanti per 5 secondi
    triggerOverlay(); // richiamo un overlay di ringraziamento
}


// creo la funzione principale per definire e visualizzare il voto medio dei clienti
function updateDisplay(){

    //assegno agli id dei vari counter il textContent corretto associando la variabile
    document.getElementById('negativeCount').textContent = negative;
    document.getElementById('neutralCount').textContent = neutral;
    document.getElementById('positiveCount').textContent = positive;
    document.getElementById('totalVote').textContent = totalVotes;


    // creo la variabile average

    let average = (positive-negative) / (totalVotes || 1); // calcolo la media ponderata sul totale dei voti, aggiungo un OR per evitare di dividere per 0
    document.getElementById('average').textContent = average.toFixed(2); // assegno all'id average il valore della media e limito il numero a 2 decimali

    // creo la costante centralImg assegnata all'icona centrale
    const centralImg = document.getElementById('centralImg');
    const averageText = document.getElementById('averageText');

    //definisco quale immagine utilizzare per mostrare la media voti corrente

    if (average > 0.3){
        centralImg.src = 'assets/img/buttons/happy.png'
        centralImg.alt = 'icona felice'
        averageText.textContent = 'che spettacolo!'
    }else if (average < -0.3){
        centralImg.src = 'assets/img/buttons/sad.png'
        centralImg.alt = 'icona triste'
        averageText.textContent = 'poco soddisfatto'
    }else { 
        centralImg.src = 'assets/img/buttons/neutral.png'
        centralImg.alt = 'icona normale'
        averageText.textContent = 'non male'
    }}

    // creo la funzione per resettare il contatore sotto l'utilizzo di una password
    function resetVotes(){
        const password = prompt('inserici la password per resettare il contatore(ichea):');
        if (password === 'ichea'){
            negative = 0;
            neutral = 0;
            positive = 0;
            totalVotes = 0;
            updateDisplay()
        }else {
            alert('password errata');
        }
    }

    // gestisco lo splash screen

    // creo le costanti con i riferimenti agli elementi del DOM

    const splashScreen = document.getElementById('splashScreen');
    const closeSplash = document. getElementById('closeSplash');
    const content = document.getElementById('content');

    // ascolto i click sull'elemento lascia una recensione per chiudere lo splashScreen
    closeSplash.addEventListener('click', closeSplashScreen);

    // creo un timer di inattivitá di 8 seconti
    let inactivityTimer;
    const TIMEOUT_INACTIVITY = 8000;

    // creo una funzione per resettare il timer di inattivitá
    function resetInactivityTimer(){
        clearTimeout(inactivityTimer); //cancello il timeout
        inactivityTimer = setTimeout(showSplashScreen, TIMEOUT_INACTIVITY); //setta un timeout di tempo TIMEOUT_INACTIVITY al termine del quale esegue la funzione showSplashScren
    }

    // funzione che mostra lo splashscren
    function showSplashScreen(){
        splashScreen.style.display = 'flex'; // mostro lo splashScreen
        content.style.display = 'none';// nascondo il content
    }
    // funzione che chiude lo splashscren
    function closeSplashScreen(){
        splashScreen.style.display = 'none'; // nascondo lo splashScreen
        content.style.display = 'block'; // mostro il content
        resetInactivityTimer(); //riavvio il timer inattivitá
    }

    // ascolto i click sull'elemento lascia una recensione per chiudere lo splashScreen
    closeSplash.addEventListener('click', closeSplashScreen);
    // creo un array di eventi e se viene triggerato uno degli eventi vado a resettare il timer
    let events = ['mousemove','click','keydown','scroll','touchstart'];
    events.forEach(event => {
        document.addEventListener(event,resetInactivityTimer);
    });

    // avvio il timer 
    resetInactivityTimer();


 


