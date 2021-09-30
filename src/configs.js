//Stuff you should edit.
module.exports = {
    reportsChannel: "000000", //Put the channel ID of where you want your bots reports to flow to.
    activeGuilds: ["0000"], //Enter all guilds using your bot, this makes sure only these guilds flow to your report channel.
    botToken: "TOKEN" // The bot you want to use this codes token, the way to make it run.
}

/*
Extra info:
Please make sure to check up on: 

Stuff for people with extra know-how

If you want to edit how reports are handled its all inside of interactionHandle.js

Configs you could remove if you added your own code:
reportsChannel - If you setup the code to add each guild a report channel.
activeGuilds - If you setup the code to add each guild a report channel.
*/