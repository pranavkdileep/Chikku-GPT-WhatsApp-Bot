import { client } from "@gradio/client";
import fs from "fs";

async function vtt(base64_audio) {
  // Convert base64 audio to buffer
  const audioBuffer = Buffer.from(base64_audio, "base64");

  // Write buffer to a WAV file
  fs.writeFileSync("audio.wav", audioBuffer);
  const exampleAudio = fs.readFileSync("audio.wav");
  const app = await client("https://sanchit-gandhi-whisper-jax.hf.space/");
  const transcription = await app.predict("/predict", [
				exampleAudio, 	// blob in 'inputs' Audio component		
				"translate", // string  in 'Task' Radio component		
				false, // boolean  in 'Return timestamps' Checkbox component
	]);
  // Log the transcription
  console.log(transcription?.data[0]);
  return transcription?.data[0];
}


export default vtt;