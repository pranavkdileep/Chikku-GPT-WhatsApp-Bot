import qrcode from 'qrcode-terminal';
import waweb from 'whatsapp-web.js';
import makeApiCall from './chikku.mjs';
import vtt from './vttt.mjs'
import getArt from './imagine.mjs';
import axios from 'axios';





const { Client,LocalAuth,MessageMedia } = waweb;
 
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
  args: ['--no-sandbox','--disable-setuid-sandbox'],
 }
});
 
client.initialize();
 
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});
 
client.on('authenticated', () => {
    console.log('Authenticated');
  });
 
client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  
if (message.hasMedia) {
    const media = await message.downloadMedia();
    const mbase64 = media.data.toString('base64');
    message.reply('transcribing...');
    vtt(mbase64)
    
  .then(response => {
    client.sendMessage(message.from, response);
    makeApiCall(response)
    
  .then(response => {
    client.sendMessage(message.from, response);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  }
  else if (message.body.includes('!imagine')) {
    const image_promt = message.body.replace('!imagine', '');
    message.reply('Generating Your Art It Will Take Around 10 Minutes...');
  
    const imm = await getArt(image_promt);
    const imageUrl = imm;
    client.sendMessage(message.from,imm)
  
    axios
      .get(imageUrl, { responseType: 'arraybuffer' })
      .then(async (response) => { // Add async here
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const mediaim = await new MessageMedia('image/jpeg', base64Image); // Remove await from here
        await client.sendMessage(message.from, mediaim); // Add await here
        console.log('Base64 Image:', base64Image);
      })
      .catch((error) => {
        console.error('Error fetching the image:', error);
      });
  }
  
  else
  {
    message.reply('Typing...');
    makeApiCall(message.body)
    
  .then(response => {
    client.sendMessage(message.from, response);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  }
 
});;