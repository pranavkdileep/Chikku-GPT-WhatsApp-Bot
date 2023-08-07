import { client } from '@gradio/client';

async function makeApiCall(inputValue) {
  try {
    const chatbotId = '3dd6b99d-2e9b-4d80-8876-1b70cd3d16b3';
    const userId = 'auto:1acacac3-3324-4336-8b18-60ea1cee9777';

    const data = {
      chatbotId: chatbotId,
      
    };

    const app = await client("pranavkd/chikkugptwa");
	  const result = await app.predict("/predict", [		
				inputValue, // string  in 'text' Textbox component
	]);

	console.log(result?.data[0]);
    return result?.data[0];
  } catch (error) {
    console.log("error");
  }
}

makeApiCall("Hi Chikku GPT How Are You?")
export default makeApiCall;
