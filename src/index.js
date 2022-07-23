const {Client, GatewayIntentBits} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})

const CCM = require('./createContextMenu');
const config = require('./configs');

let interactionsHandler = undefined;
const interactionsHandlerFile = require('./interactionHandle');

client.on('ready', () => {
    for(i in config.activeGuilds) {
        CCM(client, config.activeGuilds[i]);
    }
    console.log('ready')
    interactionsHandler = new interactionsHandlerFile(client);
})

client.on('interactionCreate', async (interaction) => {
    interactionsHandler?.interaction(interaction);
})

client.login(config.botToken);