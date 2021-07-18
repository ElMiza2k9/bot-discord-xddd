const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'bal',
    aliases: ['dinero'],
    categoria: 'Economía',
    descripcion: 'Mira tu dinero, o el de otro usuario.',
    cooldown: 5,
    uso: '[@miembro]',
    clientePermisos: [],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let miembro = message.mentions.members.first() || message.member;
        if (miembro.user.bot) return message.lineReply(`Los bots no ganan dinero :c`);

        let bal = await client.bal(miembro.id);

        let desc = bal === 0 ? `${miembro.displayName} esta sin platita` : `El dinero de ${miembro.displayName} es **${bal}**` 

        message.lineReply(new MessageEmbed()
            .setDescription(desc)
            .setColor('RANDOM')
        )
    }
}





/** 
* @INFO Código por GaTo()#7850
*/