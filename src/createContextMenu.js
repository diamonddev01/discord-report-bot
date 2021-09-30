//Type 2: User
//Type 3: Message

module.exports = async function(Client, guildId) {
    const data = [
        /*{
            name:"ping",
            description: 'replies with pong'
        },*/
        {
            name:"Say hello",
            type: 2
        },
        {
            name:"Report User",
            type: 2
        },
        {
            name: "Report Message",
            type: 3
        },
        {
            name: "Report Author",
            type: 3
        }
    ]

    await Client.guilds.cache.get(guildId)?.commands.set(data);
}