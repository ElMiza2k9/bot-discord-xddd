const { MessageEmbed, Client, Message, Util } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'choose',
    aliases: ['random'],
    categoria: 'Diversión',
    descripcion: 'Elige una opción aleatoria.',
    cooldown: 2,
    uso: '<opción 1>, [más opciones...]',
    clientePermisos: [],
    permisos: [],

    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let texto = args.join(" ").replace(/@(everyone)/gi, "`@everyone`").replace(/@(here)/gi, "`@here`")
        if (!texto) return message.lineReply(`:x: Escribe las opciones separadas en comas | **Ejemplo**: op1, op2, op3`)

        let opciones = texto.split(',')

        message.lineReplyNoMention(opciones[Math.floor(Math.random() * opciones.length)])
    }
}





/** 
* @INFO Código por GaTo()#7850
*/