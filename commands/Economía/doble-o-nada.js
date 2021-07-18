const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'doble-o-nada',
    aliases: ['dobleonada', 'don'],
    categoria: 'Economía',
    descripcion: 'Apuesta tu dinero. Duplícalo o piérdelo.',
    cooldown: 60,
    uso: '<apuesta>',
    clientePermisos: [],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        if (!args[0]) return message.lineReply(`:x: Indica una cantidad para apostar.`);
        let all = ['all', 'todo']
        if (isNaN(args[0]) && !all.includes(args[0])) return message.lineReply(`:x: Esa no es una cantidad válida.`);

        let bal = await client.bal(message.author.id);
        let plata = !isNaN(args[0]) ? parseInt(args[0]) : bal;
        if (100 > plata) return message.lineReply(`:x: Elige al menos **100 soles** para la apuesta.`)

        if (plata > bal) return message.lineReply(`:x: No tienes dinero suficiente. Solo tienes **${bal} soles**`);

        function random() { let num = Math.floor(Math.random() * 2); return num === 1; };

        if (random() === true) {
            let doble = plata * 2;
            message.lineReplyNoMention(`👍 ¡Felicidades! Ganaste **${doble} soles**`);
            client.add(message.author.id, doble);
        } else {
            client.remove(message.author.id, plata);
            message.lineReply(`Perdiste **${plata} soles**. Más suerte para la próxima.`)
        }
    }
}





/**
* @INFO Código por GaTo()#7850
*/