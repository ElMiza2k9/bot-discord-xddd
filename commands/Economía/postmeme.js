const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');
let { select } = require('../../assets/functions/random');

module.exports = {
    name: 'postmeme',
    aliases: ['subirmeme'],
    categoria: 'Economía',
    descripcion: 'Sube un meme para que sea popular.',
    cooldown: 30,
    uso: '<original | copiado | auto>',
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

        inventario.findOne({ user: message.author.id }, async (err, data) => {
            if (!data) return message.lineReply(`:x: Necesitas comprar un iPhone para crear los memes.`);

            const check = Object.keys(data.inventory).includes('iphone x') ? true : false

            if (check === false) return message.lineReply(`:x: Necesitas comprar un iPhone para crear los memes.`)
            else {
                let o = [true, true, false, false, true];
                let c = [true, false, false, false, true, true, false];
                let a = [true, false, false, true, true, false];

                if (!args[0]) return message.lineReply(`¿Qué tipo de meme quieres hacer? \`postmeme <original | copiado | auto>\``);

                if (args[0].toLowerCase() === 'original') {
                    let ro = o[Math.floor(Math.random() * o.length)];

                    if (ro === true) {
                        let plata = await select(300, 500)
                        client.add(message.author.id, plata)
                        return message.lineReply(`Tu meme fue muy original. Ganaste **${plata} soles**.`) 
                    } else if (ro === false) {
                        let plata = await select(200, 300)
                        client.remove(message.author.id, plata)
                        return message.lineReply(`A la comunidad le pareció muy <:zzzzzz:859090257437786145> tu meme. Perdiste **${plata} soles**`); 
                    }
                } else if (args[0].toLowerCase() === 'copiado') {
                    let ro = c[Math.floor(Math.random() * c.length)];

                    if (ro === true) {
                        let plata = await select(400, 500)
                        client.add(message.author.id, plata)
                        return message.lineReply(`Nadie se fijó que tu meme es un plagio. Ganaste **${plata} soles**.`) 
                    } else if (ro === false) {
                        let plata = await select(200, 400)
                        client.remove(message.author.id, plata)
                        return message.lineReply(`Bastante notorio fue el plagio <:zzzzzz:859090257437786145>. Perdiste **${plata} soles**`); 
                    }
                } else if (args[0].toLowerCase() === 'auto') {
                    let ro = a[Math.floor(Math.random() * a.length)];

                    if (ro === true) {
                        let plata = await select(300, 400)
                        client.add(message.author.id, plata)
                        return message.lineReply(`Tu meme fue un éxito. Ganaste **${plata} soles**.`) 
                    } else if (ro === false) {
                        let plata = await select(200, 250)
                        client.remove(message.author.id, plata)
                        return message.lineReply(`A la comunidad le pareció muy <:zzzzzz:859090257437786145> tu meme. Perdiste **${plata} soles**`); 
                    }
                } else return message.lineReply(`¿Qué tipo de meme quieres hacer? \`postmeme <original | copiado | auto>\``)
            }
        });
    }
}





/**
* @INFO Código por GaTo()#7850
*/