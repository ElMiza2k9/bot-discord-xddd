const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'shop',
    aliases: ['tienda'],
    categoria: 'Economía',
    descripcion: 'Mira la tienda del bot.',
    cooldown: 15,
    uso: '',
    clientePermisos: ['EMBED_LINKS'],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let items = require('../../assets/shop/items');
        if (!items.length) return message.lineReply(`:x: Oh no, parece que volvieron a robar la tienda.`);

        message.channel.send(
            new MessageEmbed()
                .setAuthor(`¡Tienda de ${client.user.username}!`)
                .setDescription([
                    `\\🎣 **Caña de pescar** - [S/300](https://bit.ly/2USZj1u)`,
                    `Solo sirve para pescar.\n`,
                    `\\📱 **iPhone X** - [S/1000](https://bit.ly/2USZj1u)`,
                    `Postea unos buenos memes.\n`,
                    `💻 **PC Gamer** - [S/5000](https://bit.ly/2USZj1u)`,
                    `Desbloqueas minijuegos.`
                ])
                .setFooter(`Más ítems próximamente | ¡Compra un ítem con el comando buy!`)
        )
    }
}





/** 
* @INFO Código por GaTo()#7850
*/