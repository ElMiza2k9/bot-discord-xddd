const { MessageEmbed, Client, Message, MessageAttachment } = require('discord.js');
const { color } = require('../../assets/json/items.json');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: 'autorol',
    aliases: ['a'],
    categoria: 'soloyo',
    descripcion: 'xd',
    cooldown: 1,
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
        if (message.author.id !== '817778158337916959') return;

        let btn1 = new MessageButton().setStyle('url').setURL('https://discord.com/channels/847661168280731648/860247110316982312/864859675199799306').setLabel('💗 Intereses')
        let btn2 = new MessageButton().setStyle('url').setURL('https://discord.com/channels/847661168280731648/860247110316982312/864859676335013928').setLabel('🌎 Región')
        let btn3 = new MessageButton().setStyle('url').setURL('https://discord.com/channels/847661168280731648/860247110316982312/864859677720707074').setLabel('👶 Edad')
        let btn4 = new MessageButton().setStyle('url').setURL('https://discord.com/channels/847661168280731648/860247110316982312/864859678379081759').setLabel('🔔 Suscripciones')
        let btn5 = new MessageButton().setStyle('url').setURL('https://discord.com/channels/847661168280731648/860247110316982312/864859700389609495').setLabel('🎨 Colores')

        let btns = new MessageActionRow().addComponents([btn1, btn2, btn3, btn4, btn5])

        message.channel.send({
            component: btns,
            embed: {
                "title": "",
                "color": 7404149,
                "description": "Pulsa los botones para navegar entre los autoroles.",
                "timestamp": "",
                "author": {
                    "name": "Menú de autoroles"
                },
                "image": {},
                "thumbnail": {
                    "url": ""
                },
                "footer": {
                    "text": "xd"
                },
                "fields": []
            }
        })

        // let attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/862448222294769694/864859323121401877/autoroles.png', 'autoroles.png');

        // message.channel.send(attachment)

        // setTimeout(() => {

        //     message.channel.send({
        //         embed: {
        //             "title": "__Intereses__",
        //             "color": 16726072,
        //             "description": "Reacciona según lo que más te gusta hacer.\n<@&860615427034316870> \n<@&860615427070492722> \n<@&860623385247219714> \n<@&860623447541153822> \n<@&860615425535639562> \n<@&860615417558073384>",
        //             "timestamp": "",
        //             "author": {
        //                 "name": "Autoroles"
        //             },
        //             "image": {},
        //             "thumbnail": {
        //                 "url": "https://image.flaticon.com/icons/png/512/2913/2913124.png"
        //             },
        //             "footer": {
        //                 "text": "¿Qué es lo que más te gusta hacer?"
        //             },
        //             "fields": []
        //         }
        //     })

        //     message.channel.send({
        //         embed: {
        //             "title": "__Región__",
        //             "color": 10878776,
        //             "description": "Reacciona de acuerdo a la región donde vives.\n<@&860614837428027412> \n<@&860614625392459777> \n<@&860614842808795156> \n<@&860614839655333930> \n<@&860615079665729537>",
        //             "timestamp": "",
        //             "author": {
        //                 "name": "Autoroles"
        //             },
        //             "image": {},
        //             "thumbnail": {
        //                 "url": "https://image.flaticon.com/icons/png/512/1946/1946763.png"
        //             },
        //             "footer": {
        //                 "text": "¿De que región eres?"
        //             },
        //             "fields": []
        //         }
        //     })

        //     message.channel.send({
        //         embed: {
        //             "title": "__Tu edad__",
        //             "color": 14123621,
        //             "description": "Según la edad que tengas, reacciona al emoji.\n<@&860602975047254026> \n<@&860613406279860234>",
        //             "timestamp": "",
        //             "author": {
        //                 "name": "Autoroles"
        //             },
        //             "image": {},
        //             "thumbnail": {
        //                 "url": "https://image.flaticon.com/icons/png/512/3788/3788071.png"
        //             },
        //             "footer": {
        //                 "text": "¿Cuántos años tienes?"
        //             },
        //             "fields": []
        //         }
        //     })

        //     message.channel.send({
        //         embed: {
        //             "title": "__Suscripciones__",
        //             "color": 16769090,
        //             "description": "Elige las notificaciones que quieres recibir.\n1️⃣ <@&864585449879502899> \n2️⃣ <@&864585438505599026>",
        //             "timestamp": "",
        //             "author": {
        //                 "name": "Autoroles"
        //             },
        //             "image": {},
        //             "thumbnail": {
        //                 "url": "https://image.flaticon.com/icons/png/512/1182/1182718.png"
        //             },
        //             "footer": {
        //                 "text": "Próximamente más..."
        //             },
        //             "fields": []
        //         }
        //     })

        //     message.channel.send({
        //         embed: {
        //             "title": "__Colores__",
        //             "color": 7374842,
        //             "description": "¡Selecciona uno de estos colores!\n<@&864583779589816381>, <@&864583667326255104>, <@&864583780122361926>, <@&864583778986754068>, <@&864583697735090237>\n<@&864584389781094411>, <@&864584397428359209>, <@&864584388749688892>",
        //             "timestamp": "",
        //             "author": {
        //                 "name": "Autoroles"
        //             },
        //             "image": {},
        //             "thumbnail": {
        //                 "url": "https://image.flaticon.com/icons/png/512/2919/2919740.png"
        //             },
        //             "footer": {
        //                 "text": "Mejorando el servidor tienes más posibilidades."
        //             },
        //             "fields": []
        //         }
        //     })

        // }, 500);
    }
}





/**
* @INFO Código por GaTo()#7850
*/