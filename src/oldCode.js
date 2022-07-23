//This code does *nothing*
//Please remember this code was retired for a reason and may not function, it is just for display purposes
//Some code may not be here, so please respect that.

//The first interactions class for testing:

class oldInteractionHandler {
    constructor(Client) {
        this.config = config;
        this.reportsChannelId = this.config.reportsChannel;
        this.reportsChannel = Client.channels.cache.get(this.reportsChannelId);
    }
    async reportSend(interaction) {
        const realTarget = await interaction.guild.members.fetch(interaction.targetId).catch((e)=>{
            console.log(e);
            interaction.reply({content:`Failed to report user due to: Internal error (#5543). You can use the code IC#554 to report this issue`, ephemeral: true});
            return;
        })
        if(!realTarget) {
            interaction.reply({content:`Failed to report user due to: Internal error (#5542). You can use the code IC#553 to report this issue`, ephemeral: true});
            return;
        }
        this.reportsChannel.send({content:'Test'});
    }
}

// v13 interactions handler
const config = require('./configs');

module.exports = class interactionHandler {
    constructor(Client) {
        this.config = config;
        this.reportsChannelId = this.config.reportsChannel;
        this.reportsChannel = Client.channels.cache.get(this.reportsChannelId);
        this.client = Client;
    }
    async interaction(interaction, Client) {
        if (Client) {
            if (interaction.isCommand()) this.commands(Client, interaction)
            if (interaction.isButton()) this.buttonPress(Client, interaction);
            if (interaction.isContextMenu()) this.contextMenu(Client, interaction);
            if (interaction.isSelectMenu()) this.selectMenu(Client, interaction);
        } else {
            if (interaction.isCommand()) this.commands(this.client, interaction)
            if (interaction.isButton()) this.buttonPress(this.client, interaction);
            if (interaction.isContextMenu()) this.contextMenu(this.client, interaction);
            if (interaction.isSelectMenu()) this.selectMenu(this.client, interaction);
        }
    }
    async commands(Client, interaction) {
        //Slash commands handle
        if (interaction.commandName == "ping") {
            interaction.reply({ content: `Coming soon to ${Client.user.username}` });
        }
    }
    async contextMenu(Client, interaction) {
        //Context menu handle
        if (interaction.commandName == "Report User") {
            if (interaction.targetId == interaction.user.id) {
                interaction.reply({ content: `Im not going to allow you to report yourself, thats pretty silly`, ephemeral: true });
                return;
            }
            const realTarget = await interaction.guild.members.fetch(interaction.targetId).catch((e) => {
                console.log(e);
                interaction.reply({ content: `Failed to report user due to: Internal error (#5543). You can use the code IC#554 to report this issue`, ephemeral: true });
                return;
            })
            if (!realTarget) {
                interaction.reply({ content: `Failed to report user due to: Internal error (#5542). You can use the code IC#553 to report this issue`, ephemeral: true });
                return;
            }
            interaction.reply({ content: `I have reported \`${realTarget.user.username}\` to the moderators of \`${interaction.guild.name}\`, thanks for reporting`, ephemeral: true });
            this.reportsChannel.send({ content: `\`${interaction.user.username}\` reported \`${realTarget.user.username}\`` });
        } else if (interaction.commandName == "Report Message") {
            const targetMessage = await interaction.channel.messages.fetch(interaction.targetId).catch((e) => {
                console.log(e);
                interaction.reply({ content: `Failed to report message due to: Internal error (#5674). You can use the code IC#654 to report this issue`, ephemeral: true });
                return;
            })
            if (!targetMessage) {
                interaction.reply({ content: `Failed to report message due to: Internal error (#5675). You can use the code IC#655 to report this issue`, ephemeral: true });
                return;
            }
            if (targetMessage.author.id == interaction.user.id) {
                interaction.reply({ content: `Im not going to allow you to report your message, thats pretty silly`, ephemeral: true });
                return;
            }
            var attachments = undefined;
            if (targetMessage.attachments.first()) {
                attachments = targetMessage.attachments.map(a => a.url);
            }
            if (attachments) this.reportsChannel.send({ content: `\`${interaction.user.username}\` reported \`${targetMessage.author.username}\`'s message (${targetMessage.url})\nContent: \`${targetMessage.content}\`\n${attachments.join(' ')}` });
            else this.reportsChannel.send({ content: `\`${interaction.user.username}\` reported \`${targetMessage.author.username}\`'s message (${targetMessage.url})\nContent: \`${targetMessage.content}\`` });
            interaction.reply({ content: `I have reported \`${targetMessage.author.username}\`'s message to the moderators of \`${interaction.guild.name}\`, thanks for reporting`, ephemeral: true });
        } else if (interaction.commandName == "Report Author") {
            const targetAuthorMessage = await interaction.channel.messages.fetch(interaction.targetId).catch((e) => {
                console.log(e);
                interaction.reply({ content: `Failed to report message due to: Internal error (#6646). You can use the code IC#877 to report this issue`, ephemeral: true });
                return;
            })
            if (!targetAuthorMessage) {
                interaction.reply({ content: `Failed to report message due to: Internal error (#6647). You can use the code IC#878 to report this issue`, ephemeral: true });
                return;
            }
            const targetUser = targetAuthorMessage.author;
            if (!targetUser) {
                interaction.reply({ content: `Failed to report message due to: Internal error (#6647). You can use the code IC#878B to report this issue`, ephemeral: true });
                return;
            }
            if (targetUser.id == interaction.user.id) {
                interaction.reply({ content: `Im not going to allow you to report yourself, thats pretty silly`, ephemeral: true });
                return;
            }
            this.reportsChannel.send({ content: `\`${interaction.user.username}\` reported \`${targetUser.username}\`` });
            interaction.reply({ content: `I have reported \`${targetUser.username}\` to the moderators of \`${interaction.guild.name}\`, thanks for reporting`, ephemeral: true })
        } else {
            interaction.reply({ content: `Coming soon to ${this.client.user.username}` });
        }
    }
    async buttonPress(Client, button) {
        //Buttons handle
    }
    async selectMenu(Client, interaction) {
        //Select menu handle
    }
}

// Version 13 index.js
const Discord = require('discord.js');
const Client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
})
const CCM = require('./createContextMenu');
const config = require('./configs');
interactionsHandler = undefined;
const interactionsHandlerFile = require('./interactionHandle');

Client.on('ready', () => {
    for (i in config.activeGuilds) {
        CCM(Client, config.activeGuilds[i]);
    }
    console.log('ready')
    interactionsHandler = new interactionsHandlerFile(Client);
})

Client.on('interactionCreate', async (interaction) => {
    interactionsHandler.interaction(interaction);
})

Client.login(config.botToken);