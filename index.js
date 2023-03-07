const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.on("ready", async () => {
    client.user.setActivity("with you")

    console.log('ready...')
});

process.on('uncaughtException', function (error) {
    console.log(new Date, error)
});

process.on('unhandledRejection', error => {
    console.log(new Date, error)
});

client.login(process.env.TOKEN);