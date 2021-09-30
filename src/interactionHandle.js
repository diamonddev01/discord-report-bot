const config = require('./configs');

module.exports = class interactionHandler {
    constructor(Client) {
        this.config = config;
        this.reportsChannelId = this.config.reportsChannel;
        this.reportsChannel = Client.channels.cache.get(this.reportsChannelId);
        this.client = Client;
    }
    async interaction(interaction, Client) {
        if(Client) {
            if(interaction.isCommand()) this.commands(Client, interaction)
            if(interaction.isButton()) this.buttonPress(Client, interaction);
            if(interaction.isContextMenu()) this.contextMenu(Client, interaction);
            if(interaction.isSelectMenu()) this.selectMenu(Client, interaction);
        } else {
            if(interaction.isCommand()) this.commands(this.client, interaction)
            if(interaction.isButton()) this.buttonPress(this.client, interaction);
            if(interaction.isContextMenu()) this.contextMenu(this.client, interaction);
            if(interaction.isSelectMenu()) this.selectMenu(this.client, interaction);
        }
    }
    async commands(Client, interaction) {
        //Slash commands handle
        if(interaction.commandName == "ping") {
            interaction.reply({content:`Coming soon to ${Client.user.username}`});
        }
    }
    async contextMenu(Client, interaction) {
        //Context menu handle
        if(interaction.commandName == "Report User"){
            const realTarget = await interaction.guild.members.fetch(interaction.targetId).catch((e)=>{
                console.log(e);
                interaction.reply({content:`Failed to report user due to: Internal error (#5543). You can use the code IC#554 to report this issue`, ephemeral: true});
                return;
            })
            if(!realTarget) {
                interaction.reply({content:`Failed to report user due to: Internal error (#5542). You can use the code IC#553 to report this issue`, ephemeral: true});
                return;
            }
            interaction.reply({content:`I have reported \`${realTarget.user.username}\` to the moderators of \`${interaction.guild.name}\`, thanks for reporting`, ephemeral: true});
            this.reportsChannel.send({content:`\`${interaction.user.username}\` reported \`${realTarget.user.username}\``});
        } else if(interaction.commandName == "Report Message") {
            const targetMessage = await interaction.channel.messages.fetch(interaction.targetId).catch((e)=>{
                console.log(e);
                interaction.reply({content:`Failed to report message due to: Internal error (#5674). You can use the code IC#654 to report this issue`, ephemeral: true});
                return;
            })
            if(!targetMessage) {
                interaction.reply({content:`Failed to report user due to: Internal error (#5675). You can use the code IC#655 to report this issue`, ephemeral: true});
                return;
            }

        } else {
            interaction.reply({content:`Coming soon to ${this.client.user.username}`});
        }
    }
    async buttonPress(Client, button) {
        //Buttons handle
    }
    async selectMenu(Client, interaction) {
        //Select menu handle
    }
}
