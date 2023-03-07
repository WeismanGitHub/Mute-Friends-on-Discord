const { Client, GatewayIntentBits } = require('discord.js');
const {GlobalKeyboardListener} = require("node-global-key-listener");
const commands = require('./commands')
require('dotenv').config();

const keyboardListener = new GlobalKeyboardListener();
const pressedKeys = new Set()

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

keyboardListener.addListener(function (e, down) {
    const { name, state } = e

    if (state == 'DOWN') {
        pressedKeys.add(name)
    } else {
        pressedKeys.delete(name)
    }

    if (pressedKeys.size !== 3) {
        return
    }

    const command = commands[Array.from(pressedKeys).join(' ')]

    if (!command) {
        return
    }

    const channel = client.channels.cache.get(process.env.CHANNEL_ID)
    channel.send(`<@${command.discordId}>`)
});

process.on('uncaughtException', function (err) {
    console.log(err)
});

process.on('unhandledRejection', error => {
    console.log(err)
});

client.login(process.env.TOKEN);