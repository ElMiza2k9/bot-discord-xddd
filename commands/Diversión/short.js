const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'short',
    aliases: ['bitly'],
    categoria: 'Diversión',
    descripcion: 'Acorta un enlace.',
    cooldown: 30,
    uso: '<url>',
    clientePermisos: [],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        const isUrl = require('is-url');
        if (!args[0]) return message.lineReply(':x: Introduce una URL válida');
        let check = await isUrl(args[0]);

        if (check === false) return message.lineReply(':x: Introduce una URL válida');

        let { MessageButton, MessageActionRow } = require('discord-buttons');

        const BitlyClient = require('bitly').BitlyClient;
        const bitly = new BitlyClient(require('../../gato.json').bitlyToken);

        bitly
            .shorten(args[0])
            .then(function (result) {
                let embed = new MessageEmbed().setTitle(`URL acortado`).setDescription(`${args[0]} => ${result.link}`)
                let btn = new MessageButton().setStyle('url').setURL(result.link).setLabel('Ir al link')
                let final = new MessageActionRow().addComponent(btn)

                message.channel.send({ embed: embed, component: final })
            })
            .catch(function (error) {
                return message.lineReply(':x: Hubo un error con Bit.ly');
            });
    }
}





/**
* @INFO Código por GaTo()#7850
*/