const { SlashCommandBuilder } = require('discord.js');
const messages = 
["Di you think it's okay to discriminate based on horoscope signs?", 
"Do you think incest didn't cause deformed babies, etc, do you think it should be legal", 
"Guys is it against company policy to have romantic relationship with coworkers", 
"I want Google \nI want Google\nI want Google\nI want Google\nv\nI want Google",
//"I peed white\nWhat's wrong with me\n😥\nIt was like milk @polar",
"I peed white\nWhat's wrong with me\n😥\nIt was like milk",
"Do you think virginity is a social construct",
"I wish they changed the rule for presidents that only us borns can become one :worrykms:",
"Why is a test engineer recommending a cp hentai\n🤔",
//"If thecco is the republican, I must be the one offsetting his bigotry",
"Anyone here got a NPC kink?",
"Why you catfishing as a girl on twitch",
"bro thinks he goku",
"You’re a communist too right",
"Big black Asian robot",
"Chinese dumplings with a side of robot sex!!!!",
//"@polar you ever thought about when you're eating popcorn that you're just eating bunch of busted nuts?",
"you ever thought about when you're eating popcorn that you're just eating bunch of busted nuts?",
//"If thecco has esex, we will too\n🔥🔥🔥🔥🔥🔥🔥"
]


module.exports = {
	data: new SlashCommandBuilder()
		.setName('goku')
		.setDescription('goku got a question'),

	async execute(interaction) {
        await interaction.reply(messages[Math.floor(Math.random()*messages.length)]);
	},
};