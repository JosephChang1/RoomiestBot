const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sushi')
		.setDescription('sushi says hi'),

	async execute(interaction) {
        await interaction.reply("Hi 🥺");
	},
};