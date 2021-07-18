const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'buy',
    aliases: ['comprar'],
    categoria: 'Economía',
    descripcion: 'Compra algo de la tienda.',
    cooldown: 3,
    uso: '<item>',
    clientePermisos: [],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let inv = require('../../assets/schemas/inventario');
        let items = require('../../assets/shop/items');

        if (!args[0]) return message.lineReply(':x: Especifíca el ítem que quieres comprar <a:zorroXDrgb:855835158836936744>')
        let compra = args.join(" ").toLowerCase();

        let check = !!items.find((val) => val.item.toLowerCase().includes(compra)) ;
        if (!check) return message.lineReply(`:x: Ese ítem no existe, revisa la tienda \`shop\`.`);

        let valid = items.find((val) => val.item.toLowerCase().includes(compra)).item

        let precio = items.find((val) => (val.item.toLowerCase()).includes(compra)).price;
        let bal = await client.bal(message.author.id);

        if (precio > bal) return message.lineReply(`:x: No puedes comprar este objeto aún. Te faltan **${precio - bal} soles**`);

        let params = { user: message.author.id }

        let llaves = {
            'caña de pescar': '\\🎣 Caña de pescar',
            'iphone x': '\\📱 iPhone X',
            'dni falso': '\\💳 DNI falso',
            'pc gamer': '\\💻 PC Gamer',
        }

        inv.findOne(params, async (err, data) => {
            if (data) {
                const hasItem = Object.keys(data.inventory).includes(valid);
                if (!hasItem) { data.inventory[valid] = 1 }
                else { data.inventory[valid]++ }
                await inv.findOneAndUpdate(params, data);
            } else { new inv({ user: message.author.id, inventory: { [valid]: 1 } }).save() }
            client.remove(message.author.id, precio)
            message.lineReplyNoMention(`Acabas de comprar **${llaves[valid]}** por **${precio} soles**`)
        })
    }
}





/**
* @INFO Código por GaTo()#7850
*/