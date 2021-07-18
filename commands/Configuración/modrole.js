const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'modrole',
    aliases: ['modrol'],
    categoria: 'Configuración',
    descripcion: 'Establece un rol de moderación y activa los comandos.',
    cooldown: 5,
    uso: '[@rol | -off]',
    clientePermisos: [],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':x: Necesitas ser \`administrador\` para usar este comando.');

        let db = require('megadb');
        let mod = new db.crearDB({ nombre: "modrol", carpeta: "Databases", sub: "Configuracion" });

        let { guild } = message

        if (!args[0]) {
            let rol;

            if (mod.tiene(`${guild.id}.mod`)) {
                let id = await mod.obtener(`${guild.id}.mod`);
                rol = guild.roles.cache.find(r => r.id === id);

                if (rol == undefined) rol = ':x: No se estableció un rol de moderador.', mod.eliminar(`${guild.id}.mod`);
            } else rol = ':x: No se estableció un rol de moderador.'

            message.channel.send(new MessageEmbed()
                .setTitle('Rol de moderador')
                .setDescription('Al establecer un rol de moderador en el bot, activas los comandos de moderación para que los miembros con el rol los usen.')
                .addFields({
                    name: "Rol establecido",
                    value: rol
                })
                .setFooter(`Uso del comando: modrol <@rol | --off>`)
                .setColor('RANDOM')
            )
        } else if (args[0] === '--off') {
            if (mod.tiene(`${guild.id}.mod`)) mod.eliminar(`${guild.id}.mod`), message.react('✅')
            else message.react('❌')
        } else {
            let rol = message.mentions.roles.filter(r => r.guild.id === guild.id).first();
            if (!rol) return message.channel.send([
                `\`\`\``,
                `modrol <@rol | --off>`,
                `        ^^^^`,
                `Indica un rol válido, o desactívalo.`,
                `\`\`\``
            ].join("\n")).then(message.react('❌'));

            mod.establecer(`${guild.id}.mod`, rol.id), message.react('✅');
        }
    }
}





/**
* @INFO Código por GaTo()#7850
*/