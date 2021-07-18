const { MessageEmbed, Client, Message } = require('discord.js');

module.exports = {
    name: 'echo',
    aliases: ['eco', 'say', 'decir'],
    categoria: 'Moderación',
    descripcion: 'Envía un mensaje a nombre del bot',
    cooldown: 3,
    uso: '<mensaje>',
    clientePermisos: ['EMBED_LINKS', 'MANAGE_MESSAGES', 'ATTACH_FILES'],
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


        let texto = args.join(' ')

        if (!texto && !message.attachments.first()) return message.lineReply(`:x: Dile algo interesante a las personas. No mandes solo imágenes`)

        message.channel.send(new MessageEmbed()
            .setAuthor(`${message.member.nickname ? message.member.nickname : message.author.username} dice:`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${texto || `** **`}`)
            .setImage(message.attachments.first() ? message.attachments.first().url.replace('cdn.discordapp.com', 'media.discordapp.net') : "")
            .setColor(message.member.displayHexColor === '#000000' ? "RANDOM" : message.member.displayHexColor)
            .setTimestamp()
        )

        try { message.delete() } catch (error) { return }
    }
}





/**
* @INFO Código por GaTo()#7850
*/