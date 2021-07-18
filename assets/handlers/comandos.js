let { readdirSync } = require('fs');
let ascii = require('ascii-table');
let comandos = new ascii('Comandos')

comandos.setHeading('Comandos', 'Estado')
comandos.removeBorder()

module.exports = client => {
    readdirSync('./commands/').forEach(dir => {
        let commands = readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

        for (let files of commands) {
            let get = require(`../../commands/${dir}/${files}`);

            if (get.name) {
                client.commands.set(get.name, get)
                comandos.addRow(files, '😀 Listo')
            } else {
                comandos.addRow(files, `❌ El comando necesita un nombre.`)
                continue;
            }
            
            if (get.aliases && Array.isArray(get.aliases)) {
                get.aliases.forEach(alias => client.aliases.set(alias, get.name))
            }
        }
    });
    console.log(comandos.toString());

    readdirSync('./events/').forEach(dir => {
        let events = readdirSync(`./events/`).filter(file => file.endsWith('.js'));

        for (let file of events) {
            let get = require(`../../events/${file}`)

            if (get.name) {
                client.events.set(get.name, get)
                eventos.addRow(file, 'Evento listo')
            } else continue;
        }
    });
}