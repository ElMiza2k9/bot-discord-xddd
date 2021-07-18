let client = require('../index');
let cooldowns = new Map();
let { Collection } = require('discord.js');
let { prefix } = require('../gato.json');

function segundoString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10) ? '0' + second : second;
    return `${hour !== '00' ? `${hour}h ` : ''}${minute !== '00' ? `${minute}m ` : ''}${second !== '00' ? `${second}s` : 'nada'}`;
};

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if (!prefixRegex.test(message.content)) return;

    let [, matchedPrefix] = message.content.match(prefixRegex);

    let args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd));

    let flags = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'
    ];

    let flagsKeys = {
        'ADMINISTRATOR': 'administrador',
        'CREATE_INSTANT_INVITE': 'crear invitación',
        'KICK_MEMBERS': 'expulsar miembros',
        'BAN_MEMBERS': 'banear miembros',
        'MANAGE_CHANNELS': 'gestionar canales',
        'MANAGE_GUILD': 'gestionar servidor',
        'ADD_REACTIONS': 'añadir reacciones',
        'VIEW_AUDIT_LOG': 'ver el registro de auditoria',
        'PRIORITY_SPEAKER': 'prioridad para hablar',
        'STREAM': 'compartir video',
        'VIEW_CHANNEL': 'ver canales',
        'SEND_MESSAGES': 'enviar mensajes',
        'SEND_TTS_MESSAGES': 'enviar mensajes de texto a voz',
        'MANAGE_MESSAGES': 'gestionar mensajes',
        'EMBED_LINKS': 'insertar enlaces',
        'ATTACH_FILES': 'adjuntar archivos',
        'READ_MESSAGE_HISTORY': 'leer el historial de mensajes',
        'MENTION_EVERYONE': 'mencionar @everyone y @here',
        'USE_EXTERNAL_EMOJIS': 'usar emojis externos',
        'VIEW_GUILD_INSIGHTS': 'ver información del servidor',
        'CONNECT': 'conectar a canales de voz',
        'SPEAK': 'hablar',
        'MUTE_MEMBERS': 'silenciar miembros',
        'DEAFEN_MEMBERS': 'ensordecer miembros',
        'MOVE_MEMBERS': 'mover miembros',
        'USE_VAD': 'usar detección de actividad de voz',
        'CHANGE_NICKNAME': 'cambiar apodo',
        'MANAGE_NICKNAMES': 'gestionar apodos',
        'MANAGE_ROLES': 'gestionar roles',
        'MANAGE_WEBHOOKS': 'gestionar webhooks',
        'MANAGE_EMOJIS': 'gestionar emojis'
    };

    if (command) {

        if (command.permisos.length) {
            let invalidos = [];
            for (const permission of command.permisos) {
                if (!flags.includes(permission)) return console.log(`Permiso inválido para ${command.name}: ${permission}`)
    
                if (!message.member.hasPermission(permission)) {
                    invalidos.push(permission)
                }
            }
    
            if (invalidos.length) {
                return message.react('❌')
            }
        }
    
        if (command.clientePermisos.length) {
            let invalidos = [];
            for (const permission of command.clientePermisos) {
                if (!flags.includes(permission)) return console.log(`Permiso inválido para ${command.name}: ${permission}`)
    
                if (!message.guild.me.hasPermission(permission)) {
                    invalidos.push(permission)
                }
            }
    
            if (invalidos.length) {
                return message.lineReply(`¡Hey! Necesito estos permisos pls: \`${flagsKeys[invalidos]}\``)
            }
        }
        
        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

        let currentTime = Date.now();
        let timestamp = cooldowns.get(command.name);
        let amount = (command.cooldown) * 1000;

        if (timestamp.has(message.author.id)) {
            let expiracion = timestamp.get(message.author.id) + amount;
            if (currentTime < expiracion) {
                let timeleft = (expiracion - currentTime) / 1000;
                return message.channel.send(`<a:reloj:862329292981665793> Espera **${segundoString(timeleft.toFixed())}** antes de usar el comando otra vez.`);
            }
        }

        timestamp.set(message.author.id, currentTime);

        setTimeout(() => {
            timestamp.delete(message.author.id);
        }, amount);

        command.run(client, message, args);
    }
})