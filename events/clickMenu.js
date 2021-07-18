const client = require('../index');
const fs = require('fs');
const { MessageEmbed, Client, Message } = require('discord.js');

let categories = [];

fs.readdirSync('./commands/').forEach((dir) => {
    const commands = fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js'))
    const cmds = commands.map((command) => {
        let file = require(`../commands/${dir}/${command}`)

        if (!file.name) {
            return 'Comando sin nombre .-.'
        }

        let name = file.name.replace('.js', '');

        return `${name}`;
    });
    let data = new Object();

    data = {
        name: `${dir} [${cmds.length}]`,
        value: `\`${cmds.length === 0 ? "Construyendo..." : cmds.join('\`, \`')}\``
    };

    categories.push(data);
});

client.on('clickMenu', async menu => {

        if (menu.values[0] === 'configHelp') {
            let config = new MessageEmbed()
                .setAuthor(`Menú de ayuda de ${client.user.username}`, client.user.displayAvatarURL())
                .addField(`⚙ Comandos de ${categories[0].name}`, categories[0].value)
                .setColor(menu.clicker.member.displayHexColor === '#000000' ? 'RANDOM' : menu.clicker.member.displayHexColor)

            menu.reply.send(config, true)
        }

        if (menu.values[0] === 'funHelp') {
            let fun = new MessageEmbed()
                .setAuthor(`Menú de ayuda de ${client.user.username}`, client.user.displayAvatarURL())
                .addField(`🎊 Comandos de ${categories[1].name}`, categories[1].value)
                .setColor(menu.clicker.member.displayHexColor === '#000000' ? 'RANDOM' : menu.clicker.member.displayHexColor)

            menu.reply.send(fun, true)
        }

        if (menu.values[0] === 'ecoHelp') {
            let eco = new MessageEmbed()
                .setAuthor(`Menú de ayuda de ${client.user.username}`, client.user.displayAvatarURL())
                .addField(`💰 Comandos de ${categories[2].name}`, categories[2].value)
                .setColor(menu.clicker.member.displayHexColor === '#000000' ? 'RANDOM' : menu.clicker.member.displayHexColor)

            menu.reply.send(eco, true)
        }

        if (menu.values[0] === 'infoHelp') {
            let info = new MessageEmbed()
                .setAuthor(`Menú de ayuda de ${client.user.username}`, client.user.displayAvatarURL())
                .addField(`📜 Comandos de ${categories[3].name}`, categories[3].value)
                .setColor(menu.clicker.member.displayHexColor === '#000000' ? 'RANDOM' : menu.clicker.member.displayHexColor)

            menu.reply.send(info, true)
        }

        if (menu.values[0] === 'modHelp') {
            let mod = new MessageEmbed()
                .setAuthor(`Menú de ayuda de ${client.user.username}`, client.user.displayAvatarURL())
                .addField(`⚒ Comandos de ${categories[4].name}`, categories[4].value)
                .setColor(menu.clicker.member.displayHexColor === '#000000' ? 'RANDOM' : menu.clicker.member.displayHexColor)

            menu.reply.send(mod, true)

        }
})