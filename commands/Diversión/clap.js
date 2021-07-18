const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'clap',
    aliases: ['aplauso'],
    categoria: 'Diversión',
    descripcion: '\\👏 Probablemente \\👏 el \\👏 comando \\👏 más \\👏 bugueable \\👏',
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
        if (!args[0] || args.join(" ").includes('*')) return message.channel.send(`:x: Escribe un texto, y por favor no uses \`*\``)
        if (args.join(" ").length > 500) return message.channel.send(`:x: Escribe un texto menor a 500 caracteres pls.`)

        let texto = args.join(" \\👏 ").replace('@everyone', '`@everyone`').replace('@here', '`@here`')

        message.channel.send('\\👏 ' + texto + ' \\👏')
    }
}





/** 
* @INFO Código por GaTo()#7850
*/