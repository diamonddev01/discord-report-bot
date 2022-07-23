const {Client} = require('discord.js');

const Client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
})

const CCM = require('./createContextMenu');
const config = require('./configs');

let interactionsHandler = undefined;
const interactionsHandlerFile = require('./interactionHandle');

Client.on('ready', () => {
    for(i in config.activeGuilds) {
        CCM(Client, config.activeGuilds[i]);
    }
    console.log('ready')
    interactionsHandler = new interactionsHandlerFile(Client);
})

Client.on('interactionCreate', async (interaction) => {
    interactionsHandler?.interaction(interaction);
})

Client.login(config.botToken);