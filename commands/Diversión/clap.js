const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'clap',
    aliases: ['aplauso'],
    categoria: 'Diversiรณn',
    descripcion: '\\๐ Probablemente \\๐ el \\๐ comando \\๐ mรกs \\๐ bugueable \\๐',
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

        let texto = args.join(" \\๐ ").replace('@everyone', '`@everyone`').replace('@here', '`@here`')

        message.channel.send('\\๐ ' + texto + ' \\๐')
    }
}





/** 
* @INFO Cรณdigo por GaTo()#7850
*/