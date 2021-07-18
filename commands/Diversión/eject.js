const { MessageEmbed, Client, Message, MessageAttachment } = require('discord.js');
const { color } = require('../../assets/json/items.json');
let zeew = require('zeew-eco');
let economia = new zeew.Economia();

module.exports = {
    name: 'eject',
    aliases: ['ejection', 'impostor'],
    categoria: 'Diversión',
    descripcion: 'Ejecuta al impostor.',
    cooldown: 5,
    uso: '<mapa> <@miembro>',
    clientePermisos: [],
    permisos: [],

    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let mapa = args[0];
        let miembro = message.mentions.members.filter(m => m.user.id !== client.user.id).first() || message.guild.members.cache.get(args[1]);

        let mapas = [`skeld`, `mira`, `polus`, `airship`];
        let impostor = [true, false, false, false, false, false];
        let remain = [1, 2];

        if (!mapa) return message.channel.send(`:x: Elige un mapa\n**Mapas:** ${mapas.join(", ")}`)
        if (!miembro) return message.channel.send(`:x: Menciona a alguien para ejecutar. \`yo no xd\``)

        if (!mapas.includes(mapa)) return message.channel.send(`:x: Mapa inválido | Uso: \`eject <mapa> <@miembro>\`\n**Mapas:** ${mapas.join(", ")}`);

        let m = {
            skeld: "The Skeld",
            mira: "MIRA HQ",
            polus: "Polus",
            airship: "The Airship"
        }

        let ejector = require('among-us-ejection');

        let tf = impostor[Math.floor(Math.random() * impostor.length)]

        let a = await ejector(
            miembro.displayName,
            tf,
            remain[Math.floor(Math.random() * remain.length)],
            m[mapa]
        )

        message.channel.send(`\`\`\`${a}\`\`\``)
    }
}





/**
* @INFO Código por GaTo()#7850
*/