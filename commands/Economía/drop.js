const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'drop',
    aliases: [],
    categoria: 'Economía',
    descripcion: 'Manda una cantidad aleatoria de dinero a un canal.',
    cooldown: 10,
    uso: '<#canal> <cantidad 1-1000000> [mensaje]',
    clientePermisos: [],
    permisos: ['MANAGE_GUILD'],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let canal = message.mentions.channels.filter(c => c.guild.id === message.guild.id && message.guild.me.permissionsIn(c.id).has('SEND_MESSAGES')).first();
        if (!canal) return message.lineReply(':x: Especifíca un canal | `drop <#canal> <cantidad 1-1000000> [mensaje]`');

        if (!args[1]) return message.lineReply(':x: Indica una cantidad para regalar. | `drop <#canal> <cantidad 1-1000000> [mensaje]`')

        if (isNaN(args[1])) return message.lineReply(`:x: ¿Qué clase de número es **${args[1]}**?`);
        if (args[1] > 1000000 || args[1] < 1) return message.lineReply(`El número está fuera de mis límites. \`1 - 1000000\``);

        let coins = Math.floor(args[1]);
        let filtro = (msg) => msg.guild.id === message.guild.id && msg.content === 'claim';
        canal.send(`Drop de **${coins} soles** por ${message.author}. Escribe \`claim\` en 30 segundos para llevarte el dinero.\n${args[2] ? `Nota: ${args.slice(2).join(" ")}` : ""}`);
        canal.awaitMessages(filtro, { max: 1, time: 30000 }).then(async (m) => {
            let id = m.first().author.id;

            client.add(id, coins);
            m.first().lineReply(`¡Felicidades **${m.first().member.displayName}**!, reclamaste **${coins} soles**`)
        }).catch(e => canal.send('¿Nadie ha reclamado creo? Bueno, el drop ha expirado.'))
    }
}





/**
* @INFO Código por GaTo()#7850
*/