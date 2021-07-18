const { MessageEmbed, Client, Message, MessageAttachment } = require('discord.js');
const { color } = require('../../assets/json/items.json');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: 'crearembed',
    aliases: ['embed'],
    categoria: 'soloyoxd',
    descripcion: 'crea un embed',
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

        let boton1 = new MessageButton()
            .setStyle('url')
            .setURL('https://discord.com/channels/847661168280731648/860246966243033098')
            .setLabel('📚 Reglas')

        let boton2 = new MessageButton()
            .setStyle('url')
            .setURL('https://ptb.discord.com/channels/847661168280731648/860256491666538516')
            .setLabel('💬 Chat')

        let boton3 = new MessageButton()
            .setStyle('url')
            .setURL('https://ptb.discord.com/channels/847661168280731648/860247110316982312')
            .setLabel('🎨 Autoroles')

        let boton4 = new MessageButton()
            .setStyle('url')
            .setURL('https://ptb.discord.com/channels/847661168280731648/860247045394792468')
            .setLabel('📢 Soporte')

        let btns = new MessageActionRow()
            .addComponents([boton1, boton2, boton3, boton4])

        let img = new MessageAttachment('https://i.imgur.com/vQ5iXoc.png', 'welcome.png')
        message.channel.send(img)
        setTimeout(() => {
            message.channel.send({
                embed: {
                    "title": "`👋` __¡BIENVENIDO AL SERVIDOR!__",
                    "color": 5793266,
                    "description": "¡Hola! De alguna manera aterrizaste en **Another Server**. Este es un lugar donde puedes encontrar amigos y pasar un buen rato.\n\n**Recuerda ver antes la información de este canal**\n<:categorias:861727575642734593> <#860246966243033098>\n\n```yaml\nㅤㅤㅤㅤㅤㅤㅤㅤㅤ🌎 Idioma del servidor\n```\n**:flag_es: Este es un servidor en español**\n<:categorias:861727575642734593> Mantén todas las conversaciones en español.\n<:categorias:861727575642734593> Esto ayuda a la comunicación entre los miembros y la moderación del servidor.\n\n```yaml\nㅤㅤㅤㅤㅤㅤㅤㅤㅤ🎏 Roles\n```\n**Equipo oficial del servidor**\n> <@&847689050470481920>: El creador del servidor.\n> <@&847845172330233872>: Bots creados por el fundador.\n> <@&847689050705231903>: Encargados de vigilar el servidor.\n> <@&853857311520063488>: Dar soporte a los demás miembros.\n\n**Especiales**\n> <@&853372942901575744>: ¡Mejora el servidor!\n> <@&860540478328012802>: Ser creador de un bot verificado.\n> <@&860566927185674320>: Cuenta el número 10,000 en <#860312547357491200>.\n> <@&860568053166899200>: Cuenta 500 veces en <#860312547357491200>.\n> <@&860561197878476810>: Cuenta 100 veces en <#860312547357491200>.\n\n**Común**\n> <@&847673934237532210>: Cualquier persona que se haya verificado lo tiene.",
                    "timestamp": "",
                    "author": {},
                    "image": {},
                    "thumbnail": {},
                    "footer": {},
                    "fields": []
                }
            })

            message.channel.send({
                embed: {
                    "color": 5793266,
                    "description": "```yaml\nㅤㅤㅤㅤㅤㅤㅤㅤㅤ🌸 Boosters\n```\n<a:boosteador:864605055591120906> Valoramos mucho que decidas mejorar el servidor. Es por eso que si te animas, nosotros te daremos algunas recompensas.\n\n**\\🎧୧ Canales de voz exclusivos**\n︱<#861621650491441162> Crea salas de voz temporales.\n︱<#860277883540865034> Acceso a actividades de Discord Together.\n\n**\\🎭୧ Un rol único**\n︱Puedes crear un rol al que podrás modificarle el nombre y el color.\n\n**\\😀୧ Emoji personalizado**\n︱Agrega un emoji o un sticker al servidor que quedará para la eternidad.\n\n**\\🔊୧ Texto a voz**\n︱Usa el comando `/tts` sin límites.\n\n**\\🖼️୧ Más imágenes**\n︱Envía imágenes y gifs (no NSFW) al chat <#860256491666538516>.\n\n**\\🔑୧ Suscripción premium**\n︱Las personas que mejoren el servidor tendrán acceso a los comandos premium de <@853768838519717898> (en proceso)",
                    "timestamp": "",
                    "author": {},
                    "image": {},
                    "thumbnail": {},
                    "footer": {},
                    "fields": []
                }
            })

            message.channel.send({
                components: btns,
                embed: {
                    "color": 5793266,
                    "description": "```yaml\nㅤㅤㅤㅤㅤㅤㅤㅤㅤ🤔 ¿Dónde inicio?\n```\n**Puedes empezar visitando los canales de esta lista sin miedo. ¡Siéntete libre de aventurarte en el servidor!**\n\n\\🎯 Primero, si no lo hiciste antes, revisa las <#860246966243033098> para que veas lo que puedes y no puedes hacer :)\n\n\\👥 Configura **tu perfil** en <#860247110316982312>. Elige autoroles y las notificaciones que quieres recibir del servidor.\n\n\\💬 Conversa con más personas en <#860256491666538516>\n\n\\🧠 Usa comandos en <#860269472669892679>\n\n\\🎺 Escucha música con <#860270015831998464> en <#860271097454264341>",
                    "timestamp": "",
                    "author": {},
                    "image": {},
                    "thumbnail": {},
                    "footer": {
                        "text": "Gracias por ser parte de este servidor :)"
                    },
                    "fields": []
                }
            })
        }, 1000);
    }
}





/**
* @INFO Código por GaTo()#7850
*/