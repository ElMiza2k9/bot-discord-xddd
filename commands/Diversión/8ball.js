const lineReply = require('discord-reply');
const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: '8ball',
    aliases: ['bola8'],
    categoria: 'Diversión',
    descripcion: 'Preguntale sobre el futuro a la bola 8.',
    cooldown: 10,
    uso: '<pregunta>',
    clientePermisos: [],
    permisos: [],

    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @param {Items} color Color para embeds
     * @returns
    */
    run: async (client, message, args) => {
        let pregunta = args.join(" ");
        if (!pregunta) return message.channel.send(`:x: Escribe una pregunta`)

        let respuestas = require('../../util/json/8ball.json');
        let respuesta = respuestas[Math.floor(Math.random() * respuestas.length)]

        return message.lineReplyNoMention(`\\🎱 ${respuesta}`)
    }
}





/** 
* @INFO Código por GaTo()#7850
*/