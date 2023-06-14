const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://truecaller.p.rapidapi.com/',
  params: { id: '16092070065' },
  headers: {
    'X-RapidAPI-Key': '607a6cb8d6mshfc703cd0528dc83p12d6a9jsn7538ee07874a',
    'X-RapidAPI-Host': 'truecaller.p.rapidapi.com'
  }
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchData(); // Call the async function to start execution
