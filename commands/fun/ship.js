const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');

module.exports = {
  name: 'ship',
  description: 'Ship two users!',
  async execute(message, args) {
    if (args.length < 2) {
      return message.reply('Please provide two users to ship!');
    }

    const user1 = message.mentions.users.first();
    const user2 = message.mentions.users.last();

    if (!user1 || !user2) {
      return message.reply('Please mention two valid users!');
    }

    // Fetch the new image from the URL
    const imageUrl = 'https://th.bing.com/th/id/OIP.ZyuNO9cONUDUo85PZTFHeAHaHI?rs=1&pid=ImgDetMain';
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const newImage = await loadImage(Buffer.from(response.data, 'binary'));

    const canvas = createCanvas(700, 700);
    const ctx = canvas.getContext('2d');

    // Draw the new image on the canvas
    ctx.drawImage(newImage, 0, 0, 700, 700);

    // Add other elements (e.g., user avatars, text) as needed
    // For example, draw user avatars in circles

    const avatar1 = await loadImage(user1.displayAvatarURL({ format: 'png' }));
    const avatar2 = await loadImage(user2.displayAvatarURL({ format: 'png' }));

    ctx.beginPath();
    ctx.arc(175, 350, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar1, 75, 250, 200, 200);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(525, 350, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar2, 425, 250, 200, 200);
    ctx.restore();

    const attachment = canvas.toBuffer();
    message.channel.send({ files: [{ attachment, name: 'ship.png' }] });
  },
};
