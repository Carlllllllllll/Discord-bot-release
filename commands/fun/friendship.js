const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('friendship')
        .setDescription('Rates the friendship between you and another user')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to rate friendship with')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const friendshipRating = Math.floor(Math.random() * 101); // Generates a random number between 0 and 100

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Friendship Rating')
            .setDescription(`${interaction.user.username} and ${user.username}'s friendship rating is ${friendshipRating}%!`)
            .setFooter({ text: 'Friendship rating is just for fun!' });

        await interaction.reply({ embeds: [embed] });
    },
};
