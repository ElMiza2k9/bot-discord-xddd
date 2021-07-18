const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'clear',
    aliases: ['purge', 'limpiar'],
    categoria: 'Moderación',
    descripcion: 'Limpia una cantidad de mensajes del canal.',
    cooldown: 5,
    uso: '<1-100>',
    clientePermisos: ['MANAGE_MESSAGES'],
    permisos: [],

    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let db = require('megadb');
        let mod = new db.crearDB({ nombre: "modrol", carpeta: "Databases", sub: "Configuracion" });
        let { guild, member } = message;

        let idrol = mod.tiene(`${guild.id}.mod`) ? await mod.obtener(`${guild.id}.mod`) : 'a'
        let rol = guild.roles.cache.find(r => r.id === idrol);

        if (rol == undefined) {
            if (mod.tiene(`${guild.id}.mod`)) mod.eliminar(`${guild.id}.mod`);
            return message.channel.send(`:x: No se estableció el rol de moderación. Establece uno con \`modrole @rol\`.`)
        };

        if (!member.roles.cache.has(rol.id)) return message.react(':x:');

        // Variables
        let cantidad = args[0]

        // Comprobación
        if (!cantidad || isNaN(cantidad)) return message.channel.send(':x: Escribe un número válido.');
        if (cantidad < 1) return message.channel.send(':x: Escribe un número mayor a 1.');
        if (cantidad > 100) return message.channel.send(':x: Escribe un número inferior a 100.')

        try {
            message.delete();
            setTimeout(async () => {
                let fetched = await message.channel.messages.fetch({ limit: cantidad })
                let time = Date.now() - 1209600000
                let fetchFinal = fetched.filter(m => m.createdTimestamp > time && m.deletable)

                message.channel.bulkDelete(fetchFinal, true)
                let bulkEmbed = new MessageEmbed()
                    .setDescription(`Borré **${fetchFinal.size}**/**${cantidad}** mensajes.`)
                    .setColor('#57F287')

                if (cantidad > fetchFinal.size) bulkEmbed.setColor('#FEE75C')
                message.channel.send(bulkEmbed)
            }, 500);
        } catch (error) { message.channel.send(':x: Ocurrió un error.') }
    }
}





/**
* @INFO Código por GaTo()#7850
*/