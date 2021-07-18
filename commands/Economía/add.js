const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');
const { delay } = require('../../assets/functions/random');

module.exports = {
    name: 'add',
    aliases: ['agregar'],
    categoria: 'Economía',
    descripcion: 'Agrega dinero a un usuario.',
    cooldown: 5,
    uso: '<@miembro>',
    clientePermisos: [],
    permisos: ['MANAGE_GUILD'],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let miembro = message.mentions.members.first() || message.member;
        if (miembro.user.bot) return message.lineReply(`Sería innecesario agregarle dinero a un bot.`);

        let dinero = args[0];
        if (isNaN(dinero) || dinero == 'Infinity') return message.lineReply('¡¿Qué clase de número es ese?!');

        client.add(miembro.id, parseInt(dinero));
        await delay(1)
        message.lineReplyNoMention(`Agregaste **${parseInt(dinero)} soles** a la cuenta de **${miembro.displayName}**. Ahora tiene **${await client.bal(miembro.user.id)} soles**.`);
    }
}





/**
* @INFO Código por GaTo()#7850
*/