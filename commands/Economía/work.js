const { MessageEmbed, Client, Message } = require('discord.js');
const { color } = require('../../assets/json/items.json');
let funciones = require('../../assets/functions/random');

module.exports = {
    name: 'work',
    aliases: ['trabajar'],
    categoria: 'EconomΓ­a',
    descripcion: 'Trabaja y consigue dinero a travΓ©s de minijuegos.',
    cooldown: 300,
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
        let trabajos = ['Futbolista', 'Moderador', 'Programador'];
        let trabajo = trabajos[Math.floor(Math.random() * trabajos.length)];

        let dinero = await funciones.select(100, 200);

        if (trabajo === 'Futbolista') {
            let base = [
                `\\π₯\\π₯\\π₯`,
                `       \\π΄`,
                ``,
                `      \\β½`
            ];

            let midT = [
                `\\π₯\\π₯\\π₯`,
                `       \\π΄`,
                `      \\β½`
            ];
            let midF = [
                `\\π₯\\π₯\\π₯`,
                `\\β½  \\π΄`,
            ];

            let leftT = [
                `\\π₯\\π₯\\π₯`,
                `\\π΄`,
                `\\β½`,
            ]
            let leftF = [
                `\\π₯\\π₯\\π₯`,
                `\\π΄  \\β½`,
            ]

            let rightT = [
                `\\π₯\\π₯\\π₯`,
                `             \\π΄`,
                `            \\β½`
            ]
            let rightF = [
                `\\π₯\\π₯\\π₯`,
                `\\β½         \\π΄`,
            ]

            let leftCanchas = [leftF, leftT];
            let midCanchas = [midF, midT];
            let rightCanchas = [rightF, rightT];

            let tiempo = 10000;

            let m = await message.lineReply([
                `**Trabajas de arquero** - Penales - Impide que la pelota entre a la red.`,
                `${base.join('\n')}`,
                `Escribe \`izquierda\` - \`centro\` - \`derecha\` para evitar que el balΓ³n toque las redes. | 10 segundos.`
            ].join('\n'));

            let i = 0;

            await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: tiempo, errors: ['time'] }).then(async colectado => {
                tiempo = colectado.first().content;
                msg = colectado.first();
            }).catch(() => { return i++ });

            if (i === 1) {
                client.add(message.author.id, parseInt(dinero / 4))
                return m.edit([
                    `**Trabajas de arquero** - Penales - Perdiste π’.`,
                    `${midF.join('\n')}`,
                    `Β‘Tardaste mucho! Ganancias: ${parseInt(dinero / 4)}`
                ].join('\n'));
            }

            if (tiempo.toLowerCase() === 'izquierda') {
                let randomLeft = leftCanchas[Math.floor(Math.random() * leftCanchas.length)];

                if (randomLeft === leftF) {
                    client.add(message.author.id, parseInt(dinero / 3))
                    return m.edit([
                        `**Trabajas de arquero** - Penales - Perdiste π’.`,
                        `${leftF.join('\n')}`,
                        `Β‘No acertaste! Ganancias: ${parseInt(dinero / 3)}`
                    ].join('\n'));
                } else if (randomLeft === leftT) {
                    client.add(message.author.id, parseInt(dinero))
                    return m.edit([
                        `**Trabajas de arquero** - Penales - Ganaste π.`,
                        `${leftT.join('\n')}`,
                        `Β‘Tapaste el penal! Ganancias: ${parseInt(dinero)}`
                    ].join('\n'));
                }
            } else if (tiempo.toLowerCase() === 'centro') {
                let randomCenter = midCanchas[Math.floor(Math.random() * midCanchas.length)];

                if (randomCenter === midF) {
                    client.add(message.author.id, parseInt(dinero / 3))
                    return m.edit([
                        `**Trabajas de arquero** - Penales - Perdiste π’.`,
                        `${midF.join('\n')}`,
                        `Β‘No acertaste! Ganancias: ${parseInt(dinero / 3)}`
                    ].join('\n'));
                } else if (randomCenter === midT) {
                    client.add(message.author.id, parseInt(dinero))
                    return m.edit([
                        `**Trabajas de arquero** - Penales - Ganaste π.`,
                        `${midT.join('\n')}`,
                        `Β‘Tapaste el penal! Ganancias: ${parseInt(dinero)}`
                    ].join('\n'));
                }
            } else if (tiempo.toLowerCase() === 'derecha') {
                let randomRight = rightCanchas[Math.floor(Math.random() * rightCanchas.length)];

                if (randomRight === rightF) {
                    client.add(message.author.id, parseInt(dinero / 3))
                    return m.edit([
                        `**Trabajas de arquero** - Penales - Perdiste π’.`,
                        `${rightF.join('\n')}`,
                        `Β‘No acertaste! Ganancias: ${parseInt(dinero / 3)}`
                    ].join('\n'));
                } else if (randomRight === rightT) {
                    client.add(message.author.id, parseInt(dinero))
                    return m.edit([
                        `**Trabajas de arquero** - Penales - Ganaste π.`,
                        `${rightT.join('\n')}`,
                        `Β‘Tapaste el penal! Ganancias: ${parseInt(dinero)}`
                    ].join('\n'));
                }
            } else return m.edit([
                `**Trabajas de arquero** - Penales - Perdiste π’.`,
                `${midF.join('\n')}`,
                `Β‘ΒΏQuΓ© clase de respuesta fue esa?! Ganancias: 0`
            ].join('\n'));
        }

        if (trabajo === 'Programador') {
            let frases = require('../../assets/json/frases.json');

            let tiempo = 5000;
            let msg;

            let palabra = frases[Math.floor(Math.random() * frases.length)];

            let mensaje = await message.lineReply([
                `**Trabajas como programador** - Β‘Escribe rΓ‘pido! - Tienes que escribir la frase lo mΓ‘s rΓ‘pido que puedas.`,
                `\`${palabra}\` | Tienes 5 segundos`
            ].join('\n'));

            let i = 0;

            let fecha = new Date();
            await mensaje.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: tiempo, errors: ['time'] }).then(async colectado => {
                tiempo = colectado.first().content;
                msg = colectado.first();
            }).catch(() => { return i++ });

            if (i === 1) {
                client.add(message.author.id, parseInt(dinero / 3))
                return mensaje.edit([
                    `**Trabajas como programador** - Β‘Escribe rΓ‘pido! - Se acabΓ³ el tiempo β`,
                    `\`${palabra}\` | Solo ganas **${parseInt(dinero / 3)}**`
                ]);
            }

            let fecha2 = new Date();
            if (tiempo.toLowerCase() === palabra.toLowerCase()) {
                client.add(message.author.id, parseInt(dinero))
                return mensaje.edit([
                    `**Trabajas como programador** - Β‘Escribe rΓ‘pido! - Ganaste π`,
                    `\`${palabra}\` | Te llevas **${parseInt(dinero)}** por escribir en ${parseInt((fecha2 - fecha) / 1000)} segundos`
                ]);
            } else {
                client.add(message.author.id, parseInt(dinero / 2))
                return mensaje.edit([
                    `**Trabajas como escritor** - Β‘Escribe rΓ‘pido! - Palabra incorrecta :x:`,
                    `\`${palabra}\` | Solo te llevas **${parseInt(dinero / 2)}**`
                ]);
            }
        }

        if (trabajo === 'Moderador') {
            let palabras = require('../../assets/json/palabras.json');
            let palabra = palabras[Math.floor(Math.random() * palabras.length)];

            let tiempo = 10000;

            let mensaje = await message.lineReply([
                `**Trabajas como moderador de Discord** - Β‘Ordena palabras!`,
                `La palabra estΓ‘ desordenada, tienes que ordenarla.`,
                `\`${palabra.shuffle()}\` | Tienes 10 segundos`
            ]);

            let i = 0;

            await mensaje.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: tiempo, errors: ['time'] }).then(async colectado => {
                tiempo = colectado.first().content;

            }).catch(() => { return i++ });

            if (i === 1) {
                client.add(message.author.id, parseInt(dinero / 3))
                return mensaje.edit([
                    `**Trabajas como moderador de Discord** - Β‘Ordena palabras! - β Se acabΓ³ el tiempo`,
                    `Perdiste, y entraron 5 raiders y acabaron con el servidor :c`,
                    `\`${palabra}\` | Ganancias: **${parseInt(dinero / 3)}**`
                ]);
            }

            if (tiempo.toLowerCase() === palabra.toLowerCase()) {
                client.add(message.author.id, parseInt(dinero))
                return mensaje.edit([
                    `**Trabajas como moderador de Discord** - Β‘Ordena palabras!`,
                    `Β‘Buen trabajo! El servidor estΓ‘ limpio de spammers. π`,
                    `\`${palabra}\` | Β‘Se acabΓ³ el tiempo! Ganancias: **${parseInt(dinero)}**`
                ]);
            } else {
                client.add(message.author.id, parseInt(dinero / 2))
                return mensaje.edit([
                    `**Trabajas como moderador de Discord** - Β‘Ordena palabras! - :x: Palabra incorrecta`,
                    `Perdiste, y entraron 5 raiders y acabaron con el servidor :c`,
                    `\`${palabra}\` | Ganancias: **${parseInt(dinero / 2)}**`
                ]);
            }
        }
    }
}





/**
* @INFO CΓ³digo por GaTo()#7850
*/


String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}