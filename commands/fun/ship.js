const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Ship two users together')
        .addUserOption(option => 
            option.setName('user1')
                .setDescription('First user to ship')
                .setRequired(true))
        .addUserOption(option => 
            option.setName('user2')
                .setDescription('Second user to ship')
                .setRequired(true)),
    async execute(interaction) {
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        if (!user1 || !user2) {
            return interaction.reply('You need to mention two users to ship them!');
        }

        // Create a canvas and draw the avatars
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        // Load avatars
        const avatar1 = await Canvas.loadImage(user1.displayAvatarURL({ format: 'png' }));
        const avatar2 = await Canvas.loadImage(user2.displayAvatarURL({ format: 'png' }));

        // Draw a background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the avatars on the canvas
        ctx.drawImage(avatar1, 50, 25, 200, 200);
        ctx.drawImage(avatar2, 450, 25, 200, 200);

        // Fetch and draw a heart in the middle
        const heartURL = 'https://i.imgur.com/a3RqlBl.png'; // URL of the heart image
        const response = await fetch(heartURL);
        const heartBuffer = await response.buffer();
        const heart = await Canvas.loadImage(heartBuffer);
        ctx.drawImage(heart, 275, 75, 150, 150);

        // Create an attachment from the canvas
        const attachment = new MessageAttachment(canvas.toBuffer(), 'ship.png');

        // Create an embed
        const embed = new MessageEmbed()
            .setTitle('Ship Result')
            .setDescription(`${user1.username} ❤️ ${user2.username}`)
            .setImage('attachment://ship.png');

        // Send the embed with the attachment
        await interaction.reply({ embeds: [embed], files: [attachment] });
    },
};
