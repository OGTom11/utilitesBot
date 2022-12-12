const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with current ping (ms)',
  },
  {
    name: "help",
    description: "All commands registered."
  },
  {
    name: "kick",
    description: "Kick a member of this server."
  }
];

const rest = new REST({ version: '10' }).setToken("MTA0NDI4NjczNjc0Nzk5MTA4MQ.G7t_zb.pk4eOhFI1tbzaS-qgKH4V7tyjsztp3yy7nLEyY");

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1044286736747991081"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();