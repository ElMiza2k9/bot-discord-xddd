const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');
const { MessageMenu, MessageMenuOption } = require('discord-buttons');

module.exports = {
    name: 'help',
    aliases: ['ayuda', 'comandos'],
    categoria: 'Información',
    descripcion: 'Mira todos mis comandos.',
    cooldown: 15,
    uso: '[comando]',
    clientePermisos: ['EMBED_LINKS'],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {

        if (!args[0]) {
            let configBtn = new MessageMenuOption().setLabel(`Configuración`).setEmoji('854169899715133471').setValue('configHelp').setDescription('Comandos para configurar el bot.')
            let funBtn = new MessageMenuOption().setLabel(`Diversión`).setEmoji('854728809579675659').setValue('funHelp').setDescription('Comandos para pasar un buen rato.')
            let ecoBtn = new MessageMenuOption().setLabel(`Economía`).setEmoji('829490624767721533').setValue('ecoHelp').setDescription('Comandos de economía.')
            let infoBtn = new MessageMenuOption().setLabel(`Información`).setEmoji('798222470850150450').setValue('infoHelp').setDescription('Comandos informativos.')
            let modBtn = new MessageMenuOption().setLabel(`Moderación`).setEmoji('866089515993792522').setValue('modHelp').setDescription('Comandos para moderar un servidor.')

            let menu = new MessageMenu()
                .setID('helpMenu').setPlaceholder(`Clic para ver las opciones ;D`).setMaxValues(1).setMinValues(1).addOptions([configBtn, funBtn, ecoBtn, infoBtn, modBtn])

            let main = new MessageEmbed()
                .setAuthor(`Menú de ayuda de ${client.user.username}`, client.user.displayAvatarURL())
                .setDescription(`¡Hola ${message.author}! Mira mis comandos interactuando con el menú de abajo. Puedes ver información detallada con el comando \`ayuda [comando]\``)
                .setFooter(`Si necesitas ayuda entra al servidor de soporte.`)
                .setColor(message.member.displayHexColor === '#000000' ? 'RANDOM' : message.member.displayHexColor)

            message.channel.send({ embed: main, component: menu })
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()))

            if (!command) {
                return message.lineReply(`El comando \`${args[0].length > 10 ? `${args[0].substring(0, 10)}…` : args[0]}\` no existe. Usa el comando \`help\` para ver todos los comandos.`)
            }

            return message.lineReplyNoMention(new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Información del comando`)
                .setDescription(`\`;${command.name ? `${command.name}` : 'ComandoSinNombreXD'} ${command.uso ? command.uso : ""}\``)
                .addField('Descripción \\📜', `${command.descripcion ? command.descripcion : "No tiene"}`)
                .addField(`Aliases \\💳`, command.aliases ? `\`${command.aliases.join("` `")}\`` : 'No tiene')
                .addField(`Cooldown \\🥶`, `${command.cooldown} segundos`)
            )
        }
    }
}





/**
* @INFO Código por GaTo()#7850
*/