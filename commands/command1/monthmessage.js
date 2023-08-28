const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message-month')
		.setDescription('Message count since last month')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel to check')
				.setRequired(true)),

	async execute(interaction) {
		const channelId = interaction.options.getChannel('channel');

		const earliestDate = new Date();
		earliestDate.setMonth(earliestDate.getMonth()-1)

		let count = 0;
		const firstMsg = await channelId.messages.fetch({limit: 1}); 
		if (!firstMsg.first()){
			count = 0;
		} else {
			count = await fetchMessagesUntil(channelId, earliestDate, firstMsg.first().id);
		}
		
        await interaction.reply(`Roomiest says: There are ${count} messages in ${channelId.url} since last month [ ${earliestDate} ]`);
	},
};

async function fetchMessagesUntil(channel, earliestDate, lastID) {
    let messages = await channel.messages.fetch({ limit: 100, before: lastID });
	messages.sweep(msg => msg.createdAt.getTime() < earliestDate.getTime());

	let arr = Array.from(messages);
	if (arr.length == 0) return 1;

	return arr.length + (await fetchMessagesUntil(channel, earliestDate, messages.last().id));
}