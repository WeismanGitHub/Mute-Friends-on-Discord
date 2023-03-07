const { Client, GatewayIntentBits } = require('discord.js');
const {GlobalKeyboardListener} = require("node-global-key-listener");
const hotkeys = require('./hotkeys')
require('dotenv').config();

const keyboardListener = new GlobalKeyboardListener();
const pressedKeys = new Set()

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
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

    const hotkeyData = hotkeys[Array.from(pressedKeys).join(' ')]

    if (!hotkeyData) {
        return
    }

    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    const member = guild.members.cache.find(user => user.id == hotkeyData.discordId)

    if (!member) {
        return
    }

    member.voice.setMute(!member.voice.serverMute)
});

process.on('uncaughtException', function (err) {
    console.log(err)
});

process.on('unhandledRejection', err => {
    console.log(err)
});

client.login(process.env.TOKEN);