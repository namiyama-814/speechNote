/**
 * MomentumSpeech: Web Speech API をラップした文字起こしクラス
 */
class MomentumSpeech {
  constructor(onFinal, onInterim) {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    this.recognition.lang = 'ja-JP';
    this.recognition.interimResults = true;
    this.recognition.continuous = true;

    this.onFinal = onFinal;
    this.onInterim = onInterim;

    this.init();
  }

  init() {
    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          this.onFinal(transcript);
        } else {
          interimTranscript = transcript;
        }
      }
      this.onInterim(interimTranscript);
    };

    this.recognition.onend = () => {
      console.log("Speech recognition ended.");
    };

    this.recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  }

  start() {
    try {
      this.recognition.start();
    } catch (e) {
      console.error("Recognition already started or error:", e);
    }
  }

  stop() {
    this.recognition.stop();
  }
}