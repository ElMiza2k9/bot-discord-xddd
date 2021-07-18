let client = require('../index');
let mongoose = require('mongoose');
let { mongodb } = require('../gato.json');

client.on('ready', async () => {
    console.log(`Sesión iniciada como ${client.user.tag} | En ${client.guilds.cache.size} servidores.`);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: `;help`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/fernanfloo'
        }
    });

    mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(console.log('Conectado a la base de datos'))
})