import { client } from "@gradio/client";
import fs from "fs";

async function vtt(base64_audio) {
  // Convert base64 audio to buffer
  const audioBuffer = Buffer.from(base64_audio, "base64");

  // Write buffer to a WAV file
  fs.writeFileSync("audio.wav", audioBuffer);

  // Load the Gradio app
  const app = await client("abidlabs/whisper");

  // Read the WAV file
  const audioFile = fs.readFileSync("audio.wav");

  // Transcribe the audio
  const transcription = await app.predict("/predict", [audioFile]);

  // Log the transcription
  console.log(transcription?.data[0]);
  return transcription?.data[0];
}


export default vtt;
