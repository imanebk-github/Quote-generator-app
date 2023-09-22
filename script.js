const synth = window.speechSynthesis;

const quoteText = document.querySelector('.quote');
const quoteBtn = document.querySelector('.new-quote');
const author = document.querySelector('.name');
const soundbt = document.querySelector('.sound');
const copydbt = document.querySelector('.copy');
const twitterbt = document.querySelector('.twitter');


// Random quote Function
const randomQuote = () => {
    quoteBtn.classList.add('loading');
    quoteBtn.innerHTML = 'loading quote...';
    // fetching random quote/data from API and parsing it into javascript object
    fetch('https://api.quotable.io/random').then(res => res.json()).then(result =>{
        console.log(result);
        quoteText.innerText = result.content;
        author.innerText = result.author
        quoteBtn.innerText = 'New Quote';
        quoteBtn.classList.remove('loading');
    })
}

soundbt.addEventListener('click', () => {
    // Web Speech API
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
    utterance.lang = "en-UK";
    let voices = window.speechSynthesis.getVoices();

    let maleVoice = null;
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name.includes("Male")) {
            maleVoice = voices[i];
            break;
        }
    }
    if (maleVoice) {
        utterance.voice = maleVoice;
        utterance.voiceURI = maleVoice.voiceURI;
    }
    speechSynthesis.speak(utterance);
})
quoteBtn.addEventListener('click', randomQuote);