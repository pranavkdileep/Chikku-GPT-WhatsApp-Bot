import axios from "axios";

async function getArt(imagine) {
  const options = {
    method: 'GET',
    url: 'https://ai-artist-api-pro.onrender.com/generate-image/',
    params: {
      prompt: imagine
    },
    headers: {
      'X-RapidAPI-Key': '50c9c3f974msh08092f88f044eedp10a9f2jsnfaf6222bc9c6',
      'X-RapidAPI-Host': 'ai-image-art-generator.p.rapidapi.com'
    },
    timeout: 600000,
  };
  

  try {
    const response = await axios.request(options);
    const image_url = response.data.image_url;
    console.log(response.data);
    return image_url;
  } catch (error) {
    console.error(error);
  }
}





export default getArt;
