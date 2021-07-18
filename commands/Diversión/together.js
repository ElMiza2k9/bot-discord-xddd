const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');
const config = require('../../gato.json');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: 'together',
    aliases: [],
    categoria: 'Diversión',
    descripcion: 'Crea una sesión de Discord Together',
    cooldown: 3,
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
        if (!message.member.voice.channel) return message.channel.send(':x: Necesitas entrar a un canal de voz.')

        let yt = await client.together.createTogetherCode(message.member.voice.channelID, 'youtube');
        let betrayal = await client.together.createTogetherCode(message.member.voice.channelID, 'betrayal')
        let poker = await client.together.createTogetherCode(message.member.voice.channelID, 'poker')
        let fishing = await client.together.createTogetherCode(message.member.voice.channelID, 'fishing')

        let boton1 = new MessageButton().setStyle('url').setURL(yt.code).setLabel('YouTube').setEmoji('795494343833157632');
        let boton2 = new MessageButton().setStyle('url').setURL(poker.code).setLabel('Poker Night').setEmoji('860337177577259029');
        let boton3 = new MessageButton().setStyle('url').setURL(betrayal.code).setLabel('Betrayal.io').setEmoji('860337177237258240');
        let boton4 = new MessageButton().setStyle('url').setURL(fishing.code).setLabel('Fishington.io').setEmoji('860337177581846569');

        let btns = new MessageActionRow().addComponents([boton1, boton2, boton3, boton4]);

        let Embed = new MessageEmbed().setAuthor('Menú de Discord Together').setDescription(`Bienvenido al menú de actividades. Pulsa alguno de esos botones para iniciar una actividad.`)

        message.channel.send({ embed: Embed, component: btns })
    }
}





/**
* @INFO Código por GaTo()#7850
*/