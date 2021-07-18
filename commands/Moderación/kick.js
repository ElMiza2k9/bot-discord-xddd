const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'kick',
    aliases: ['expulsar'],
    categoria: 'Moderación',
    descripcion: 'Expulsa a un miembro del servidor.',
    cooldown: 5,
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
        let razon = args.slice(1).join(" ");

        // Proceso de baneo
        if (!miembro) return message.channel.send(`:x: Menciona a un miembro del servidor (yo no xddd).`)
        if (miembro.user.id === message.author.id) return message.channel.send(`:x: Puedes salir del servidor de otra forma xD.`);
        if (miembro.user.id === guild.ownerID) return message.channel.send(':x: No puedes expulsar al owner de su propio servidor.');
        if (miembro.roles.highest.position >= member.roles.highest.position) return message.channel.send(`:x: No puedes expulsar a alguien de mayor rango.`);
        if (miembro.roles.highest.position >= guild.me.roles.highest.position) return message.channel.send(`:x: No puedo expulsar a alguien de mayor rango que yo.`);
        if (!razon) return message.channel.send(':x: Indica una razón.');
        if (!miembro.kickable) return message.channel.send(':x: No puedo expulsar a este miembro :c');

        try {
            miembro.kick({ reason: `${razon} - ${message.author.tag}` })

            let embed = new MessageEmbed()
                .setAuthor(`¡${miembro.user.username} expulsado!`, miembro.user.displayAvatarURL({ dynamic: true }))
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
                        `**Razón**: ${razon.substring(0, 200)}${razon.length > 200 ? '...' : ''}`
                    ]
                })
                .setFooter(`Fecha:`)
                .setTimestamp()
                .setColor(message.member.displayHexColor)

            message.channel.send(embed);
            miembro.user.send(embed.setAuthor(`¡Fuiste expulsado!`, miembro.user.displayAvatarURL({ dynamic: true })));

        } catch (error) {
            return message.channel.send(':x: No pude expulsar a este miembro :c');
        }
    }
}





/**
* @INFO Código por GaTo()#7850
*/