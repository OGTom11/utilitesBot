const console = require('console');
const { Client, GatewayIntentBits, italic, createChannel, ChannelType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const gmtHours = new Date().getUTCHours();
const config = require("./config.json")
//------------------------------------------------------------------------
const helpEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Commands')
	.setURL('https://discord.gg/gd6N9nP6CB')
	.setAuthor({ name: 'Boring Games™'})
	.setDescription(`All registed commands @ Boring Games™`)
	.setThumbnail(`https://cdn.discordapp.com/attachments/1051182033004662834/1051581764356817027/498B1E57-07E1-4D06-99C0-5EE8D681C483.png`)
	.addFields(
		{ name: 'Commands:', value: '*Slash Commands*'},
		{ name: '\u200B', value: '\u200B' },
		{ name: '/help', value: 'All commands registered.', inline: true },
    { name: '/ping', value: 'Replies with current ping (ms)', inline: true },
	)
	.setImage('https://cdn.discordapp.com/attachments/1051182033004662834/1051582385680031945/New_Project_1.png')
	.setTimestamp()
	.setFooter({ text: 'Writen by XEN#7398'});

  const errorMessage = new EmbedBuilder()
	.setColor("Red")
	.setTitle('System Error')
	.setURL('https://discord.gg/gd6N9nP6CB')
	.setAuthor({ name: 'Boring Games™'})
	.setDescription(`There has been an issue with this task. Please contact support if necessary.`)
	.setTimestamp()
	.setFooter({ text: `Produced @ Boring Games™ 👨‍💻🔧`});

  const OutOfHours = new EmbedBuilder()
	.setColor("Orange")
	.setTitle('Feature Unavailable at this time.')
	.setURL('https://discord.gg/gd6N9nP6CB')
	.setAuthor({ name: 'Boring Games™'})
	.setDescription(`User Commands will only work between 10AM-7PM GMT`)
	.setTimestamp()
	.setFooter({ text: `Produced @ Boring Games™ 👨‍💻🔧`});

const path = require('path');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  if(gmtHours>19) {
    client.user.setPresence({ activities: [{name: 'Out of hours 🌙'}], status: "dnd"});
  }else {
    client.user.setPresence({ activities: [{name: '/help | Boring Games™'}], status: "online"});
  }

  if(gmtHours<10) {
    client.user.setPresence({ activities: [{name: 'available at 10AM GMT'}], status: "dnd"});
  }
//--------------------------------------------------
console.log(`Logged in as ${client.user.tag}!`);
 }
)

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    if(gmtHours>19) {
      await interaction.reply({ embeds: [OutOfHours] })
    } else {
    await interaction.reply(`🏓 | Latency is: **${Date.now() - interaction.createdTimestamp}ms.**`);
    }
  }

  if (interaction.commandName === 'help') {
    if(gmtHours>19) {
      await interaction.reply({ embeds: [OutOfHours] })
    } else {
      await interaction.reply({ embeds: [helpEmbed] })
    }
  }

  if (interaction.commandName === 'kick') {
  await interaction.reply({ embeds: [errorMessage] })
}
})

client.on("guildCreate", guild => {
  console.log("Joined a new guild: " + guild.name);
  guild.channels.create({
    name: "Utilites-System",
    type: ChannelType.GuildText
});
})

client.login(config.token);
