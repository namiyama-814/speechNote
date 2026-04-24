const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';
speech.interimResults = true;
speech.continuous = true;

const btn = document.getElementById('btn');
const content = document.getElementById('content');

let interimDisplay = document.createElement('div');
interimDisplay.style.color = 'gray';
content.appendChild(interimDisplay);

btn.addEventListener('click', () => {
  speech.start();
});

speech.onresult = (e) => {
  let interimTranscript = '';
  for (let i = e.resultIndex; i < e.results.length; i++) {
    let transcript = e.results[i][0].transcript;
    
    if (e.results[i].isFinal) {
      content.insertAdjacentHTML('beforeend', '<div>' + transcript + '</div>');
    } else {
      interimTranscript = transcript;
    }
  }

  interimDisplay.innerText = interimTranscript;
  content.appendChild(interimDisplay);
};