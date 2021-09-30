const Discord = require('discord.js');
const Client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
})
const CCM = require('./createContextMenu');
const config = require('./configs');
interactionsHandler = undefined;
const interactionsHandlerFile = require('./interactionHandle');

Client.on('ready', () => {
    for(i in config.activeGuilds) {
        CCM(Client, config.activeGuilds[i]);
    }
    console.log('ready')
    interactionsHandler = new interactionsHandlerFile(Client);
})

Client.on('interactionCreate', async (interaction) => {
    interactionsHandler.interaction(interaction);
})

Client.login(config.botToken);