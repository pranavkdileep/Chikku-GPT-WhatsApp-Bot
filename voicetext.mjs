// Converts Base64 audio to text using the Web Speech API
async function convertAudioToText(base64Audio) {
  const audioBuffer = Buffer.from(base64Audio, 'base64');
  const audioBlob = new Blob([audioBuffer], { type: 'audio/wav' });
  const audioURL = URL.createObjectURL(audioBlob);

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';

  return new Promise((resolve, reject) => {
    recognition.onresult = event => {
      const result = event.results[0][0].transcript;
      resolve(result);
    };

    recognition.onerror = event => {
      reject(new Error(event.error));
    };

    recognition.onend = () => {
      URL.revokeObjectURL(audioURL);
    };

    recognition.start();

    const audio = new Audio(audioURL);
    audio.play();
  });
}

// Main function to convert Base64 audio to text
async function voicetext(base64) {
  try {
    const text = await convertAudioToText(base64);
    return text;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default voicetext;

