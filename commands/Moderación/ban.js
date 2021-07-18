const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'ban',
    aliases: ['banear'],
    categoria: 'Moderación',
    descripcion: 'Banea a un miembro del servidor.',
    cooldown: 5,
    uso: '<@miembro> <razón>',
    clientePermisos: ['BAN_MEMBERS'],
    permisos: [],

    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let db = require('megadb');
        let mod = new db.crearDB({ nombre: "modrol", carpeta: "Databases", sub: "Configuracion" });
        let { guild, member } = message;

        let idrol = mod.tiene(`${guild.id}.mod`) ? await mod.obtener(`${guild.id}.mod`) : 'a'
        let rol = guild.roles.cache.find(r => r.id === idrol);

        if (rol == undefined) {
            if (mod.tiene(`${guild.id}.mod`)) mod.eliminar(`${guild.id}.mod`);
            return message.channel.send(`:x: No se estableció el rol de moderación. Establece uno con \`modrole @rol\``)
        };

        if (!member.roles.cache.has(rol.id)) return message.react(':x:');

        // VARIABLES
        let miembro = message.mentions.members.filter(m => m.user.id !== client.user.id).first();
        let dias = !isNaN(args[1]) ? Number(args[1]) : 1;
        let razon = isNaN(args[1]) ? args.slice(1).join(" ") : args.slice(2).join(" ");

        // Proceso de baneo
        if (!miembro) return message.channel.send(`:x: Menciona a un miembro del servidor (yo no xddd).`)
        if (miembro.user.id === message.author.id) return message.channel.send(`:x: No puedes autobanearte.`);
        if (miembro.user.id === guild.ownerID) return message.channel.send(':x: No puedes banear al owner.');
        if (miembro.roles.highest.position >= member.roles.highest.position) return message.channel.send(`:x: No puedes banear a alguien de mayor rango.`);
        if (miembro.roles.highest.position >= guild.me.roles.highest.position) return message.channel.send(`:x: No puedo banear a alguien de mayor rango que yo.`);
        if (!razon) return message.channel.send(':x: Indica una razón.');
        if (!miembro.bannable) return message.channel.send(':x: No puedo banear a este miembro :c');
        if (isNaN(dias) || dias < 0) dias = 0
        if (dias > 7) dias = 7

        try {
            miembro.ban({ reason: `${razon} - ${message.author.tag}`, days: dias })
            message.channel.send(new MessageEmbed()
                .setAuthor(`¡${miembro.user.username} baneado!`, miembro.user.displayAvatarURL({ dynamic: true }))
                .addFields({
                    name: 'Miembro',
                    value: [
                        `**Tag**: ${miembro.user.tag}`,
                        `**ID**: ${miembro.user.id}`
                    ].join('\n')
                }, {
                    name: 'Moderador',
                    value: [
                        `**Tag**: ${message.author.tag}`,
                        `**ID**: ${message.author.id}`
                    ].join('\n')
                }, {
                    name: 'Más información',
                    value: [
                        `**Razón**: ${razon.substring(0, 200)}${razon.length > 200 ? '...' : ''}`,
                        `**Mensajes eliminados**: ${dias == 0 ? 'Ninguno' : `Últimos ${dias} días.`}`
                    ]
                })
                .setFooter(`Fecha:`)
                .setTimestamp()
                .setColor(message.member.displayHexColor)
            )
        } catch (error) {
            return message.channel.send(':x: No pude banear a este miembro :c');
        }
    }
}





/**
* @INFO Código por GaTo()#7850
*/