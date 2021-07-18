const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');
let db = require('megadb');

module.exports = {
    name: 'simjoin',
    aliases: ['simularjoin'],
    categoria: 'Configuración',
    descripcion: 'Simula una bienvenida en el servidor. Solo lo reconocerá el bot.',
    cooldown: 20,
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

        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`:x: Necesitas permiso para \`administrar el servidor\`.`);

        message.react('🔁');

        client.emit('guildMemberAdd', message.member);

        try { message.react('👌') } catch (error) { return };
    }
}





/**
* @INFO Código por GaTo()#7850
*/