const { Client, GatewayIntentBits, Partials, REST, ActivityType, Routes, InteractionResponseType } = require('discord.js');
const { token, clientId, guildId, ownerId } = require('./config.json');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Member]
});
     // Check if the bot is on or off
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options, user } = interaction;

    if (commandName === 'nitro') {
        const member = options.getMember('user');
        if (!member) {
            return interaction.reply('Please mention a valid member.');
        }

        // Check if the member has a premium subscription (Nitro)
        if (member.premiumSince) {
            return interaction.reply(`${member.user.tag} has Nitro.`);
        } else {
            return interaction.reply(`${member.user.tag} does not have Nitro.`);
        }
    }
});

client.login(token);
