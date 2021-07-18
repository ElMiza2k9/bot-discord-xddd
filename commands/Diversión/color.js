const { MessageEmbed, Client, Message, MessageAttachment } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'color',
    aliases: [],
    categoria: 'Diversión',
    descripcion: 'Muestra detalles sobre un color HEX',
    cooldown: 5,
    uso: '<hex | rgb | hsl> <color>',
    clientePermisos: ['EMBED_LINKS'],
    permisos: [],

    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        function esHex(codigo) {
            return typeof codigo === 'string' && codigo.length === 6 && !isNaN(Number('0x' + codigo))
        }

        function esRGB(codigo) {
            let reg = new RegExp(/[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/gm)
            let test = reg.test(codigo)
            return test
        }

        if (args[0] === 'hex') {
            if (!esHex(args[1])) return message.channel.send(`:x: Escribe un color hex válido. (sin el \`#\`) | **Ejemplo**: AABBCC`)

            let fetch = require('node-fetch');
            let { Canvas } = require('canvacord');

            let url = `https://www.thecolorapi.com/id?hex=${args[1]}`

            fetch(url)
                .then(async res => {
                    let a = await res.json()
                    let colored = await Canvas.color(a.hex.value)
                    let final = new MessageAttachment(colored, `${a.hex.clean}.png`)

                    message.lineReplyNoMention(new MessageEmbed()
                        .attachFiles(final)
                        .setColor(a.hex.value.toLowerCase() === '#ffffff' ? '#fcfcfc' : a.hex.value)
                        .setTitle(a.name.value)
                        .addFields(
                            { name: 'HEX', value: `${a.hex.value}`, inline: true },
                            { name: 'RGB', value: `${a.rgb.r}, ${a.rgb.g}, ${a.rgb.b}`, inline: true },
                            { name: 'HSL', value: `${a.hsl.h}, ${a.hsl.s}, ${a.hsl.l}`, inline: true }
                        )
                        .setThumbnail(`attachment://${a.hex.clean}.png`)
                        .setFooter(`API usada: https://www.thecolorapi.com/`)
                    )
                })
        } else if (args[0] === 'rgb') {
            if (!esRGB(args.slice(1).join(" "))) return message.channel.send(`:x: Escribe un color RGB válido. (con los \`()\`) | **Ejemplo**: (15, 17, 200)`)

            let fetch = require('node-fetch');
            let { Canvas } = require('canvacord');

            let url = `https://www.thecolorapi.com/id?rgb=${args.slice(1).join(" ")}`

            fetch(url)
                .then(async res => {
                    let a = await res.json()
                    let colored = await Canvas.color(a.hex.value)
                    let final = new MessageAttachment(colored, `${a.hex.clean}.png`)

                    message.lineReplyNoMention(new MessageEmbed()
                        .attachFiles(final)
                        .setColor(a.hex.value.toLowerCase() === '#ffffff' ? '#fcfcfc' : a.hex.value)
                        .setTitle(a.name.value)
                        .addFields(
                            { name: 'HEX', value: `${a.hex.value}`, inline: true },
                            { name: 'RGB', value: `${a.rgb.r}, ${a.rgb.g}, ${a.rgb.b}`, inline: true },
                            { name: 'HSL', value: `${a.hsl.h}, ${a.hsl.s}, ${a.hsl.l}`, inline: true }
                        )
                        .setThumbnail(`attachment://${a.hex.clean}.png`)
                        .setFooter(`API usada: https://www.thecolorapi.com/`)
                    )
                })
        } else if (args[0] === 'hsl') {
            if (!esRGB(args.slice(1).join(" "))) return message.channel.send(`:x: Escribe un color HSL válido. (con los \`()\`) | **Ejemplo**: (13, 86, 55)`)

            let fetch = require('node-fetch');
            let { Canvas } = require('canvacord');

            let url = `https://www.thecolorapi.com/id?hsl=${args.slice(1).join(" ")}`

            fetch(url)
                .then(async res => {
                    let a = await res.json()
                    let colored = await Canvas.color(a.hex.value)
                    let final = new MessageAttachment(colored, `${a.hex.clean}.png`)

                    message.lineReplyNoMention(new MessageEmbed()
                        .attachFiles(final)
                        .setColor(a.hex.value.toLowerCase() === '#ffffff' ? '#fcfcfc' : a.hex.value)
                        .setTitle(a.name.value)
                        .addFields(
                            { name: 'HEX', value: `${a.hex.value}`, inline: true },
                            { name: 'RGB', value: `${a.rgb.r}, ${a.rgb.g}, ${a.rgb.b}`, inline: true },
                            { name: 'HSL', value: `${a.hsl.h}, ${a.hsl.s}, ${a.hsl.l}`, inline: true }
                        )
                        .setThumbnail(`attachment://${a.hex.clean}.png`)
                        .setFooter(`API usada: https://www.thecolorapi.com/`)
                    )
                })
        } else return message.lineReply('Indica una transformación válida del color: \`hex\`, \`rgb\` o \`hsl\`')
    }
}





/**
* @INFO Código por GaTo()#7850
*/