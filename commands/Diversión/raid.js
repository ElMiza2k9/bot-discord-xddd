const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'raid',
    aliases: ['raidear'],
    categoria: 'Diversión',
    descripcion: '¿Raid? No lo creo',
    cooldown: 15,
    uso: '',
    clientePermisos: ['KICK_MEMBERS'],
    permisos: [],

    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`:x: Necesito el permiso para expulsar miembros.`)
        if (message.guild.me.roles.highest.comparePositionTo(message.member.roles.highest) <= 0) return message.channel.send(`:x: Tu máximo rol debe estar debajo del mío.`)
        if (message.author.id === message.guild.ownerID) return message.channel.send(`:x: Los owners no pueden usar esto.`)

        message.channel.send([
            `**Iniciando el proceso raid**`,
            `<a:carga:862394817219526697> Eliminando canales...`,
            `<a:carga:862394817219526697> Eliminando roles...`,
            `<a:carga:862394817219526697> Expulsando usuarios...`
        ].join('\n')).then(m => {
            setTimeout(() => {
                m.edit([
                    `**Iniciando el proceso raid**`,
                    `:x: No pude eliminar los canales...`,
                    `:x: No pude eliminar los roles...`,
                    `<a:carga:862394817219526697> Expulsandote...`
                ].join('\n'))
            }, 3000);

            setTimeout(() => {
                m.edit([
                    `**Iniciando el proceso raid**`,
                    `:x: No pude eliminar los canales...`,
                    `:x: No pude eliminar los roles...`,
                    `✅ A casa raider...`
                ].join('\n'))
            }, 6000);

            setTimeout(() => {
                try { message.member.kick('Raider xD') } catch (error) { return }
            }, 9000);
        })
    }
}





/**
* @INFO Código por GaTo()#7850
*/