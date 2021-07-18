const { MessageEmbed, Client, Message, MessageAttachment } = require('discord.js');
const { color } = require('../../assets/json/items.json');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: 'xddd',
    aliases: ['reglas'],
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
            .setURL('https://discord.com/channels/847661168280731648/864353335410294785')
            .setLabel('📚 Info')

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

        let img = new MessageAttachment('https://i.imgur.com/mFIps1U.png', 'welcome.png')
        message.channel.send(img)
        setTimeout(() => {
            message.channel.send({
                embed: {
                    "title": "`📜` __¡REGLAS DEL SERVIDOR!__",
                    "color": 15118161,
                    "description": "Nuestras reglas serán enlistadas abajo, y aplican en **todo el servidor**, los mensajes y archivos adjuntos que envíes, tu nombre de usuario, tu foto de perfil y estados.\nRecuerda que tu eres el único responsable de lo que mandas y dices. Tu cuenta es **tu responsabilidad**.\n\n```fix\n🐍 Términos y Condiciones de Discord\n```\n> En este servidor rigen las **[Condiciones de Servicio](https://discord.com/terms \"Condiciones de Servicio de Discord - 7 de mayo de 2020\")** y las **[Directivas de Comunidad](https://discord.com/guidelines \"Directivas de Comunidad - 19 de mayo de 2020\")** de Discord.\n\n```fix\n👺 No incites al odio \n```\n> En este servidor está prohibido el acoso, la homofobia, el racismo, el sexismo y sus similares. Se incluyen los insultos raciales u homofóbicos. Puedes llegar ser baneado sin previo aviso por el incumplimiento de esta norma.\n\n```fix\n🎩 Se cortés con los demás usuarios\n```\n> Todos los miembros siempre deben mostrar respeto hacia los demás miembros del servidor. Si no puede arreglar una situación de forma respetuosa, salga de ella y comuníquese con el equipo de moderación.\n\n```fix\n🔞 Prohibido el contenido NSFW/gore\n```\n> No se permite nada que sea NSFW o sugerente. Se incluyen discusiones sobre tales temas. Si detectamos ese tipo de contenido, se aplicará la máxima sanción.\n\n```fix\n💰 La publicidad y la venta están prohibidas\n```\n> No pidas dinero o suscripciones, tampoco intentes comprar/vender/regalar nada ni promocionar tus redes sociales. Esto incluye enviar mensajes directos a cualquier miembro del servidor.\n\n```fix\n👤 No uses caracteres especiales ni suplantes a nadie\n```\n> Tu nombre de usuario debe cumplir con el resto de reglas y debe ser @mencionable. Tampoco te hagas pasar por el personal del servidor o figuras públicas.\n\n```fix\n🧪 No distribuyas material ilegal\n```\n> No distribuyas material peligroso o ilegal como software pirata, botnets, etc.\n\n```fix\n🧠 Usa el sentido común\n```\n> No podemos mencionar todas las reglas, así que preferimos confiar en tu sentido común.",
                    "timestamp": ""
                },
                component: btns
            })
        }, 1000);
    }
}





/**
* @INFO Código por GaTo()#7850
*/