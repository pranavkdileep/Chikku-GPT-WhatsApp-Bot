import qrcode from 'qrcode-terminal';
import waweb from 'whatsapp-web.js';
import makeApiCall from './chikku.mjs';
import voicetext from './voicetext.mjs'



const { Client,LocalAuth } = waweb;
 
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
    
  //   voicetext(mbase64)
  // .then(text => console.log('Text:', text))
  // .catch(error => console.error('Error:', error));
  
    
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