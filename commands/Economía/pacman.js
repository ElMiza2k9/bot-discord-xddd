const Discord = require('discord.js');
const game = require('../../assets/functions/pacman');

module.exports = {
    name: 'pacman',
    aliases: [],
    categoria: 'Minijuegos',
    descripcion: 'Inicia un juego de Pacman. | 1 jugador',
    cooldown: 60,
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
            if (!data) return message.lineReply(`:x: Para jugar necesitas una buena PC Gamer.`);

            const check = Object.keys(data.inventory).includes('pc gamer') && data.inventory['pc gamer'] > 0 ? true : false

            if (check === false) return message.lineReply(`:x: Para jugar necesitas una buena PC Gamer.`)
            else {
                let pts = ['🍓', '🍇', '🍒', '🍘', '🍭']
                let random = Math.floor(Math.random() * (pts.length))

                let mapa = [
                    "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣",
                    "▣▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▣",
                    "▣▣▩▩◇◇◇▩▩▩▩ᗣ▩▩▩▩◇◇◇▩▩▩▣",
                    "▣▩▩▩▣▣▣▣▩▩▣▩▩▣▩▣▣▣▩▩▩▩▣",
                    "▣▩▩▩▣▩▩◇▩▣▣▣▩▩▩▩▣ᗣ▩▩▩▩▣",
                    "▣▩▩▩▩▩▣▣▩▩▣▩▩▣▣▩▩▩▩▩▩▩▣",
                    "▣▣▩▩▩▩ᗣ▩▩▩▩▩▩▩ᗣ▩▩▩▩▩◇▩▣",
                    "▣◇▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩◇▩▣",
                    "▣◇▩▩▩▩▣▣▩▩▣▩▩▣▣▩▩▩▩▩▩▩▣",
                    "▣▩▩▩▣▩▩▩▩▣▣▣▩▩▩▩▣▩▩▩▩▩▣",
                    "▣▩▩▩▣▣◇▩▩▩▣▩▩▩▩▩◇▣▣▩▩▩▣",
                    "▣▣▩▩◇◇◇▣▩▩ᗧ▩▩▩▩▣◇◇◇▩▩▩▣",
                    "▣▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▣",
                    "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣"
                ]

                let match = new game.PacGame(mapa, 3, {
                    win_text: `¡Ganaste ${message.member.nickname || message.author.username}!`,
                    to_lose_text: `Has perdido ${message.member.nickname || message.author.username}. Más suerte a la próxima`,
                    time_out_text: `Tardaste mucho ${message.member.nickname || message.author.username}, ponte pilas 🔋 xD`,
                    coin_points: 164,
                    coin_text: pts[random],
                    time_text: "⌛",
                })

                match.start_game(message)

                match.on("end", (type, monedas, tiempo) => {
                    if (type == 'player') {
                        client.add(message.author.id, parseInt(monedas / 2))
                        message.lineReply(`¡Ganaste **${parseInt(monedas / 2)} soles** en esta partida!`)
                    }

                    if (type == 'ghost') {
                        client.add(message.author.id, parseInt(monedas / 4))
                        message.lineReply(`¡Ganaste **${parseInt(monedas / 4)} soles** en esta partida!`)
                    }

                    if (type == 'time') {
                        client.add(message.author.id, parseInt(monedas / 3))
                        message.lineReply(`¡Ganaste **${parseInt(monedas / 3)} soles** en esta partida!`)
                    }

                    if (type == 'error') {
                        message.lineReplyNoMention(`¡Ha ocurrido un error inesperado!`)
                    }
                })
            }
        });
    }
}