const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'inventory',
    aliases: ['inventario', 'mochila', 'inv'],
    categoria: 'Economía',
    descripcion: 'Mira tu inventario.',
    cooldown: 3,
    uso: '',
    clientePermisos: ['EMBED_LINKS'],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let inventario = require('../../assets/schemas/inventario');
        let items = require('../../assets/shop/items');

        let llaves = {
            'caña de pescar': '\\🎣 Caña de pescar',
            'iphone x': '\\📱 iPhone X',
            'dni falso': '\\💳 DNI falso',
            'pc gamer': '\\💻 PC Gamer',
        }

        inventario.findOne({ user: message.author.id }, async (err, data) => {
            if (!data) return message.lineReply(`:x: No tienes nada en tu inventario.`);

            const mappedData = Object.keys(data.inventory).filter((k) => data.inventory[k] >= 1).map((k) => {
                return `${llaves[k]} - ${data.inventory[k]}`
            }).join('\n');

            message.lineReplyNoMention(
                new MessageEmbed()
                    .setAuthor(`Inventario de ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(mappedData)
                    .setFooter(`¡Compra más cosas con el comando buy!`)
            )
        });
    }
}





/**
* @INFO Código por GaTo()#7850
*/