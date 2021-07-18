const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'bienvenidas',
    aliases: ['welcome'],
    categoria: 'Configuración',
    descripcion: 'Configura las bienvenidas en el servidor.',
    cooldown: 5,
    uso: '[<categoría> <argumentos>]',
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

        let db = require('megadb');
        let { guild } = message
        let data = new db.crearDB({ nombre: 'welcome', carpeta: 'Databases', sub: 'Configuracion' });
        let { verifyImageURL } = require('verify-image-url');

        let getCanal;
        let getMensaje;
        let getFondo;

        if (data.tiene(`${guild.id}.canal`)) {
            let id = await data.obtener(`${guild.id}.canal`);
            getCanal = client.channels.cache.find(c => c.id == id)
            if (getCanal == undefined) {
                getCanal = ':x: No establecido'
                data.eliminar(`${guild.id}.canal`)
            }
        } else getCanal = ':x: No establecido'

        if (data.tiene(`${guild.id}.msg`)) {
            getMensaje = await data.obtener(`${guild.id}.msg`);
        } else getMensaje = ':x: No establecido'

        if (data.tiene(`${guild.id}.bg`)) {
            getFondo = await data.obtener(`${guild.id}.bg`);
            let img = await verifyImageURL(getFondo);
            if (!img.isImage) {
                getFondo = ':x: No establecido'
                data.eliminar(`${guild.id}.bg`)
            }
        } else getFondo = ':x: No establecido'

        if (!args[0]) {
            let embed = new MessageEmbed()
                .setTitle(`Configuración de bienvenidas`)
                .setDescription(`Modifica estos parámetros con \`welcome <param> <args>\``)
                .addFields({
                    name: 'Canal',
                    value: getCanal
                }, {
                    name: 'Mensaje',
                    value: getMensaje.replace('{miembro}', message.author.username).replace('{server}', guild.name).replace('{count}', guild.memberCount)
                }, {
                    name: 'Fondo',
                    value: getFondo !== ':x: No establecido' ? `** **` : getFondo
                })
                .setColor('RANDOM')
                .setImage(getFondo !== ':x: No establecido' ? getFondo : null)
                .setFooter('Puedes probar las bienvenidas con el comando "simjoin"')

            message.channel.send(embed)
        }

        if (args[0] === 'canal') {
            if (!args[1]) {
                message.channel.send([
                    `\`\`\``,
                    `welcome <canal> <#canal | off>`,
                    `                ^^^^^^^^^^^^^^`,
                    `Especifica el canal para las bienvenidas, o desactivalo.`,
                    `\`\`\``
                ].join("\n"))
            } else if (args[1].toLowerCase() === 'off') {
                if (data.tiene(`${guild.id}.canal`)) data.eliminar(`${guild.id}.canal`), message.react(`✅`)
                else message.react('❌')
            } else {
                let canal = message.mentions.channels.filter(c => c.guild.id === guild.id && c.type === 'text').first()
                if (!canal) return message.channel.send(`:x: Menciona un canal de texto del servidor.`)

                data.establecer(`${guild.id}.canal`, canal.id)
                message.react(`✅`)
            }
        } else if (args[0] === 'mensaje') {
            if (!args[1]) {
                message.channel.send([
                    `\`\`\``,
                    `welcome <mensaje> <texto | --off>`,
                    `                  ^^^^^^^^^^^^^^^`,
                    `Dedicales un mensaje a tus nuevos miembros.`,
                    `\`\`\``,
                    `**Variables:**`,
                    `\`{miembro}\` Nombre del miembro | ${message.author.username}`,
                    `\`{server}\` Nombre del servidor | ${guild.name}`,
                    `\`{count}\` Conteo de los miembros | ${guild.memberCount}`
                ].join("\n"))
            } else if (args[1].toLowerCase() === '--off') {
                if (data.tiene(`${guild.id}.msg`)) {
                    data.eliminar(`${guild.id}.msg`)
                    message.react(`✅`)
                } else message.react('❌')
            } else {
                let texto = args.slice(1).join(" ")
                if (texto.length > 500) return message.channel.send(`:x: Escribe un texto menor a 500 caracteres. | Caracteres utilizados: **${texto.length}**`)
                data.establecer(`${guild.id}.msg`, texto)
                message.react(`✅`)
                message.channel.send(new MessageEmbed()
                    .setTitle(`Vista previa:`)
                    .setDescription(texto.replace('{miembro}', message.author.username).replace('{server}', guild.name).replace('{count}', guild.memberCount))
                )
            }
        } else if (args[0] === 'fondo') {
            if (!args[1]) {
                message.channel.send([
                    `\`\`\``,
                    `welcome <fondo> <url | --off>`,
                    `                ^^^^^^^^^^^^^`,
                    `Indica una url válida, o restablece la imagen.`,
                    `\`\`\``
                ].join("\n"))
            } else if (args[1].toLowerCase() === '--off') {
                if (data.tiene(`${guild.id}.bg`)) {
                    data.eliminar(`${guild.id}.bg`)
                    message.react(`✅`)
                } else message.react('❌')
            } else {
                let link = args[1]

                let a = await verifyImageURL(link)
                if (!a.isImage) return message.channel.send(`:x: Introduce el URL de una imagen válida, de preferencia que no sea muy pesada.`)

                data.establecer(`${guild.id}.bg`, link)

                message.react(`✅`)
                message.channel.send(new MessageEmbed()
                    .setTitle(`Vista previa:`)
                    .setImage(link)
                    .setFooter('Tamaño recomendado: 1024px * 500px')
                )
            }
        }
    }
}





/**
* @INFO Código por GaTo()#7850
*/