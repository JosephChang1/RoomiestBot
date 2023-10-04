// Required modules
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Initialize client
const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.MessageContent,
	]
  })

// Collect commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Discord client loggin message
client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

// Interact with command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Capture Joever moment
client.on('messageCreate', async message => {
  if (message.author.bot) return false;

  try {
	if (message.content.toLowerCase().includes("joever")) {
	  await message.reply( {files: ["./images/" + "joever.jpg"]} )
	} else if (message.content.toLowerCase().includes("waltuh") || message.content.includes("finger")) {
		const member = await message.guild.members.fetch(message.author);
  		const nickname = member ? member.nickname : message.author.displayName;
		await message.reply( {files: ["./images/" + "waltuh.png"], content: `I am not having sex with you right now ${nickname}`} )
	} else if (	message.content.toLowerCase().includes("nigga") || 
				message.content.toLowerCase().includes("nigger")|| 
				message.content.toLowerCase().includes("hentai")|| 
				message.content.toLowerCase().includes("logan")|| 
				message.content.toLowerCase().includes("balls")|| 
				message.content.toLowerCase().includes("cum")) {
		await message.reply( {files: ["./images/" + "stare.jpg"] })
	}
  } catch (error) {
	console.error(error);
  }
});

  

client.login(token);