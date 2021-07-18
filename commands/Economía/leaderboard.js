const { MessageEmbed, Client, Message, Collection } = require('discord.js');
const { color } = require('../../assets/json/items.json');

module.exports = {
    name: 'leaderboard-bal',
    aliases: ['top'],
    categoria: 'Economía',
    descripcion: 'Mira las personas con más dinero del servidor.',
    cooldown: 10,
    uso: '[página]',
    clientePermisos: [],
    permisos: [],
    /**
     * @param {Client} client Cliente
     * @param {Message} message Mensaje
     * @param {String[]} args Argumentos
     * @returns
    */
    run: async (client, message, args) => {
        let coleccion = new Collection();

        await Promise.all(message.guild.members.cache.map(async (m) => {
            let id = m.id; let bal = await client.bal(id);
            return bal !== 0 ? coleccion.set(id, { id, bal }) : null
        }));

        let data = coleccion.sort((a, b) => b.bal - a.bal).first(10);

        message.channel.send(
            new MessageEmbed()
                .setAuthor(`Top 10 personas con más dinero en ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addFields({
                    name: `Usuario`,
                    value: data.map((v, i) => { return `#${i + 1} **${message.guild.members.cache.get(v.id).user.tag}**`}),
                    inline: true
                }, {
                    name: `Dinero`,
                    value: data.map((v, i) => { return `${v.bal} soles`}),
                    inline: true
                })
        )
    }
}





/**
* @INFO Código por GaTo()#7850
*/