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