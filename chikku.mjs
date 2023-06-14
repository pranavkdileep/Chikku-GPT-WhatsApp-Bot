import axios from 'axios';

const apiUrl = 'https://ora.ai/api/conversation';

const headers = {
  'authority': 'ora.ai',
  'accept': '*/*',
  'accept-language': 'en-IN,en;q=0.9',
  'content-type': 'application/json',
  'cookie': '__Host-next-auth.csrf-token=8b8372dd548d04118b010f73b7d28ebf964a0d21801e5db0f9ca745e5045e8fa%7C12e90d18e71d62b84fc03fd55df4bd6a7504fb622ab9ed69c41727512c9432d8; __Secure-next-auth.callback-url=https%3A%2F%2Fora.ai; _ga=GA1.1.623172915.1685004246; _ga_MWL7THFH58=GS1.1.1685004246.1.0.1685004246.0.0.0; __cf_bm=wbZ.aYmAH7N1rczxxmg.TaVQaN.FTBCyc_ABcg5x658-1685004246-0-AUaqgqsRRrqkeSz3dWE1xl5gtsE4w0rKRuYluPZkWotsh2TGklkQwNh0c7DW7qZVwPtaFtVApyNLYQnQowDigKEs0K6O5Ot26VThxoNGbNBV',
  'origin': 'https://ora.ai',
  'referer': 'https://ora.ai/openai/chatgpt',
  'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
};

async function makeApiCall(inputValue) {
  try {
    const chatbotId = '3dd6b99d-2e9b-4d80-8876-1b70cd3d16b3';
    const userId = 'auto:1acacac3-3324-4336-8b18-60ea1cee9777';

    const data = {
      chatbotId: chatbotId,
      input: inputValue,
      userId: userId,
      provider: 'OPEN_AI',
      config: false,
      includeHistory: true
    };

    const response = await axios.post(apiUrl, data, { headers });
    const responseData = response.data;

    // Extract and return the response
    const responseText = responseData.response;
    return responseText;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
export default makeApiCall;
