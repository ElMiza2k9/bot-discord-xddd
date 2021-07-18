const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'smallcaps',
    aliases: ['smallcap'],
    categoria: 'Diversión',
    descripcion: 'Esᴛᴇ ᴛᴇxᴛᴏ ᴅᴇ ᴀᴄᴀ',
    cooldown: 3,
    uso: '<texto>',
    clientePermisos: [],
    permisos: [],

    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let texto = args.join(' ').toLowerCase();
        if (!texto) return message.channel.send(`:x: Esᴄʀɪʙᴇ ᴜɴ ᴛᴇxᴛᴏ.`);

        let match = require('../../assets/json/smallcaps.json');
        let smallcaps = words => words.split('').map((l) => (match[l] !== undefined) ? match[l] : l).join('');

        message.channel.send(smallcaps(texto))
    }
}





/**
* @INFO Código por GaTo()#7850
*/