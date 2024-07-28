const { SlashCommandBuilder } = require('@discordjs/builders');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Canvas = require('canvas');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Ships two users together')
        .addUserOption(option => option.setName('user1').setDescription('First user').setRequired(true))
        .addUserOption(option => option.setName('user2').setDescription('Second user').setRequired(true)),
    async execute(interaction) {
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(path.join(__dirname, 'images', 'heart.gif'));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatar1 = await Canvas.loadImage(user1.displayAvatarURL({ format: 'jpg' }));
        const avatar2 = await Canvas.loadImage(user2.displayAvatarURL({ format: 'jpg' }));

        ctx.drawImage(avatar1, 150, 25, 200, 200);
        ctx.drawImage(avatar2, 350, 25, 200, 200);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'ship.png' });

        const embed = new EmbedBuilder()
            .setTitle('Shipping Result!')
            .setDescription(`${user1.username} ❤ ${user2.username}`)
            .setImage('attachment://ship.png');

        await interaction.reply({ embeds: [embed], files: [attachment] });
    },
};
