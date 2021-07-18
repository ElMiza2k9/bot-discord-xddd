const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');
let { select, delay } = require('../../assets/functions/random');

module.exports = {
    name: 'fish',
    aliases: ['pescar'],
    categoria: 'Economía',
    descripcion: 'Anda al lago y pesca un rato.',
    cooldown: 15,
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
        let inventario = require('../../assets/schemas/inventario');

        let params = { user: message.author.id }

        inventario.findOne({ user: message.author.id }, async (err, data) => {
            if (!data) return message.lineReply(`:x: Para pescar necesitas una caña de pescar.`);

            const check = Object.keys(data.inventory).includes('caña de pescar') && data.inventory['caña de pescar'] > 0 ? true : false

            if (check === false) return message.lineReply(`:x: Para pescar necesitas una caña de pescar.`)
            else {
                let cañas = [false, true, true];
                let caña = cañas[Math.floor(Math.random() * cañas.length)];

                if (caña === true) inventario.findOne(params, async (err, data) => { --data.inventory['caña de pescar']; await inventario.findOneAndUpdate(params, data); });
                
                let peces = [`🐟`, `🐠`, `🐟`, `🐟`, `🐠`, `🐟`, `🐟`, `🐠`, `🐡`, `🐟`, `🐠`, `🐡`];
                let pez = peces[Math.floor(Math.random() * peces.length)]

                if (pez === `🐟`) {
                    let plata = await select(200, 400)
                    client.add(message.author.id, plata);
                    return message.lineReply(`¡Atrapaste un pescadito \\🐟! ¡Ganaste **${plata} soles**!\n\\🎣 Tu caña ${caña === true ? `se rompió` : `está OK`}`)
                } else if (pez === `🐠`) {
                    let plata = await select(300, 500)
                    client.add(message.author.id, plata);
                    return message.lineReply(`¡Atrapaste a Nemo \\🐠! ¡Ganaste **${plata} soles**!\n\\🎣 Tu caña ${caña === true ? `se rompió` : `está OK`}`)
                } else if (pez === `🐡`) {
                    let plata = await select(300, 700)
                    client.add(message.author.id, plata);
                    return message.lineReply(`¡Atrapaste un pez grande \\🐡! ¡Ganaste **${plata} soles**!\n\\🎣 Tu caña ${caña === true ? `se rompió` : `está OK`}`)
                } 
            }
        });
    }
}





/**
* @INFO Código por GaTo()#7850
*/