const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');
let { select } = require('../../assets/functions/random');

module.exports = {
    name: 'daily',
    aliases: ['diario'],
    categoria: 'Economía',
    descripcion: 'Recoge dinero diariamente.',
    cooldown: 86400,
    uso: '',
    clientePermisos: [],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let monedas = select(500, 1000);

        client.add(message.author.id, monedas);
        message.lineReplyNoMention(new MessageEmbed()
            .setAuthor('Dinero recolectado exitosamente')
            .setDescription(`Obtuviste **${monedas} soles**. Recuerda volver mañana para recoger tu dinero.`)
        )
    }
}





/**
* @INFO Código por GaTo()#7850
*/