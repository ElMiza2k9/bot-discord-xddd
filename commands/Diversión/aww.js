const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'aww',
    aliases: ['cute'],
    categoria: 'Diversión',
    descripcion: 'Lindo, pero no tiene que ser un gato o perro.',
    cooldown: 3,
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
        let reddit = require('reddit.images');

        let m = await message.lineReplyNoMention(`<a:carga:862394817219526697> Buscando algo lindo...`)

        let fetch = await reddit.reddit.FetchSubredditPost('awww', 'rising')

        try { m.edit(fetch.image) } catch (error) { return };
    }
}





/**
* @INFO Código por GaTo()#7850
*/