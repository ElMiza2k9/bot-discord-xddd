let Discord = require('discord.js');
require('discord-reply');
let { readdirSync } = require('fs');
let { DiscordTogether } = require('discord-together');
let { token, prefix } = require('./gato.json');
let NekoClient = require('nekos.life');
let schema = require('./assets/schemas/schema');

Discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android';
Discord.Constants.DefaultOptions.http.cdn = 'https://cdn.discordapp.com';

let client = new Discord.Client({
    restTimeOffset: 0
});

require("discord-buttons")(client);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = readdirSync('./commands');
client.neko = new NekoClient();
client.together = new DiscordTogether(client);
client.prefix = prefix;

module.exports = client;

['comandos'].forEach((handler) => {
    require(`./assets/handlers/${handler}`)(client)
});

// Funciones economía

// add
client.add = (id, coins) => {
    schema.findOne({ id }, async (err, data) => {
        if (err) throw err;
        if (data) { data.coins += coins; } else { data = new schema({ id, coins }) };
        data.save();
    })
};

// remove
client.remove = (id, coins) => {
    schema.findOne({ id }, async (err, data) => {
        if (err) throw err;
        if (data) { data.coins -= coins; } else { data = new schema({ id, coins: -coins }) };
        data.save();
    })
};

// bal
client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if (!data) return ful(0);
    ful(data.coins)
})


client.login(token);