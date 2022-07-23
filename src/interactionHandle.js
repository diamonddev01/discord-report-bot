const { InteractionType, ApplicationCommandType } = require('discord.js');
const config = require('./configs');

module.exports = class interactionHandler {
    constructor(Client) {
        this.config = config;
        this.reportsChannelId = this.config.reportsChannel;
        this.reportsChannel = Client.channels.cache.get(this.reportsChannelId);
        this.client = Client;
    }
    async interaction(interaction, Client) {
        // Removed support for non-context based interactions :(
        if(interaction.type == InteractionType.ApplicationCommand && (interaction.commandType == ApplicationCommandType.Message || interaction.commandType == ApplicationCommandType.User)) this.contextMenu(Client ? Client : this.client, interaction);
    }
    async contextMenu(Client, interaction) {
        //Context menu handle
        if (interaction.commandName == "Report User") {
            
            // Stops the user reporting themselves
            if(interaction.targetId == interaction.user.id) {
                interaction.reply({ content: `Im not going to allow you to report yourself, thats pretty silly`, ephemeral: true }).catch(console.log);
                return;
            }

            // Fetches the user
            const realTarget = await interaction.guild.members.fetch(interaction.targetId).catch((e) => {
                console.log(e);
                interaction.reply({ content: `Failed to report user due to: Internal error (#5543). You can use the code IC#554 to report this issue`, ephemeral: true }).catch(console.log);
                return;
            });

            // Checks if the user is in the guild
            if(!realTarget) {
                interaction.reply({ content: `Failed to report user due to: Internal error (#5542). You can use the code IC#553 to report this issue`, ephemeral: true }).catch(console.log);
                return;
            }

            // Sends the report
            this.reportsChannel.send({ content: `\`${interaction.user.username}\` reported \`${realTarget.user.username}\`` }).catch(console.log).then(_msg => {
                interaction.reply({ content: `I have reported \`${realTarget.user.username}\` to the moderators of \`${interaction.guild.name}\`, thanks for reporting`, ephemeral: true }).catch(console.log);
            });
        }
        else if (interaction.commandName == "Report Message") {
            // Get the message
            const targetMessage = await interaction.channel.messages.fetch(interaction.targetId).catch((e)=>{
                console.log(e);
                interaction.reply({ content: `Failed to report message due to: Internal error (#5674). You can use the code IC#654 to report this issue`, ephemeral: true }).catch(console.log);
                return;
            })

            // Checks the message exists
            if(!targetMessage) {
                interaction.reply({ content: `Failed to report message due to: Internal error (#5675). You can use the code IC#655 to report this issue`, ephemeral: true }).catch(console.log);
                return;
            }

            // Checks the message is not by the same person as the reporter
            if(targetMessage.author.id == interaction.user.id) {
                interaction.reply({ content: `Im not going to allow you to report your message, thats pretty silly`, ephemeral: true }).catch(console.log);
                return;
            }

            // Gets message based data  
            this.reportsChannel.send({ content: `\`${interaction.user.username}\` reported \`${targetMessage.author.username}\`'s message (${targetMessage.url})\nContent: \`${targetMessage.content}\`` }).catch(console.log).then(_msg => {
                interaction.reply({ content: `I have reported \`${targetMessage.author.username}\`'s message to the moderators of \`${interaction.guild.name}\`, thanks for reporting`, ephemeral: true }).catch(console.log);
            });
        }
        else if (interaction.commandName == "Report Author") {
            // Gets teh authors message
            const targetAuthorMessage = await interaction.channel.messages.fetch(interaction.targetId).catch((e)=>{
                console.log(e);
                interaction.reply({ content: `Failed to report message due to: Internal error (#6646). You can use the code IC#877 to report this issue`, ephemeral: true }).catch(console.log);
                return;
            })

            // Checks the message exits
            if(!targetAuthorMessage) {
                interaction.reply({ content: `Failed to report message due to: Internal error (#6647). You can use the code IC#878 to report this issue`, ephemeral: true }).catch(console.log);
                return;
            }

            // Checks the user exists
            const targetUser = targetAuthorMessage.author;
            if(!targetUser) {
                interaction.reply({ content: `Failed to report message due to: Internal error (#6647). You can use the code IC#878B to report this issue`, ephemeral: true }).catch(console.log);
                return;
            }

            // Checks the user isnt reporting themselves
            if(targetUser.id == interaction.user.id) {
                interaction.reply({ content: `Im not going to allow you to report yourself, thats pretty silly`, ephemeral: true }).catch(console.log);
                return;
            }

            // Files the report
            this.reportsChannel.send({ content: `\`${interaction.user.username}\` reported \`${targetUser.username}\`` }).catch(console.log).then(_msg => {
                interaction.reply({ content: `I have reported \`${targetUser.username}\` to the moderators of \`${interaction.guild.name}\`, thanks for reporting`, ephemeral: true }).catch(console.log);
            });
        }
    }
}
