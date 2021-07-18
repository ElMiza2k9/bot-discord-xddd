const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'vaporwave',
    aliases: ['aesthetics'],
    categoria: 'Diversión',
    descripcion: 'ｅｌ　ｔｅｘｔｏ　ｒａｒｏ',
    cooldown: 2,
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
        let texto = args.join(" ").replace(/(\r\n|\n|\r)/gm, " ");
        if (!texto) return message.channel.send(`:x: Escribe un texto`)

        let vaporwave = require('vaporwave-generator');
        message.channel.send(vaporwave(texto))
    }
}





/** 
* @INFO Código por GaTo()#7850
*/