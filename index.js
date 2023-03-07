const { Client, GatewayIntentBits } = require('discord.js');
const {GlobalKeyboardListener} = require("node-global-key-listener");
require('dotenv').config();

const keyboardListener = new GlobalKeyboardListener();

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

const keyStrokes = new Set(['LEFT CTRL', 'LEFT ALT', 'NUMPAD 7'])
const pressedKeys = new Set()

keyboardListener.addListener(function (e, down) {
    const { name, state } = e

    if (state == 'DOWN') {
        pressedKeys.add(name)
    } else {
        pressedKeys.delete(name)
    }

    if (pressedKeys.size !== keyStrokes.size) {
        return
    }

    for (let stroke of pressedKeys) {
        if (!keyStrokes.has(stroke)) {
            return
        }
    }

    console.log('ctrl + alt + numpad 7 has been pressed!')
});

process.on('uncaughtException', function (err) {
    console.log(err)
});

process.on('unhandledRejection', error => {
    console.log(err)
});

client.login(process.env.TOKEN);