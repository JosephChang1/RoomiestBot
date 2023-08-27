const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('echoes my message')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('User input')
				.setRequired(true)),
	async execute(interaction) {
		const msg = interaction.options.getString('input');
		// category must be one of 'gif_funny', 'gif_meme', or 'gif_movie'
        await interaction.reply("Roomiest says: " + msg);
	},
};