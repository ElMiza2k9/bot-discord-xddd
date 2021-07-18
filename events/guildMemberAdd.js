let client = require('../index');
let db = require('megadb');
let data = new db.crearDB({ nombre: 'welcome', carpeta: 'Databases', sub: 'Configuracion' });
let { verifyImageURL } = require('verify-image-url');
let { MessageAttachment } = require('discord.js');
let gradiants = require('../assets/json/gradiants.json');

client.on('guildMemberAdd', async (member) => {

    let { guild } = member;

    if (data.tiene(`${guild.id}.canal`)) {
        let id = await data.obtener(`${member.guild.id}.canal`);
        let canal = guild.channels.cache.find(c => c.id === id);
        if (canal == undefined) return data.eliminar(`${guild.id}.canal`);

        let bg;

        if (data.tiene(`${guild.id}.bg`)) {
            bg = await data.obtener(`${guild.id}.bg`)
            let check = await verifyImageURL(bg)

            if (!check.isImage) {
                bg = gradiants[Math.floor(Math.random() * gradiants.length)]; data.eliminar(`${guild.id}.bg`);
            }

        } else bg = gradiants[Math.floor(Math.random() * gradiants.length)]

        let tex;

        if (data.tiene(`${guild.id}.msg`)) tex = await data.obtener(`${guild.id}.msg`)
        else tex = '';

        let texto = tex.replace('{miembro}', member.user.username).replace('{server}', guild.name).replace('{count}', guild.memberCount)

        // Canvas
        let Canvas = require('canvas');
        let canvas = new Canvas.createCanvas(1024, 500);
        let ctx = canvas.getContext('2d');

        Canvas.registerFont('./assets/fonts/arial-unicode.ttf', { family: 'Arial Unicode MS' })

        let wallpaper = await Canvas.loadImage(bg);
        ctx.drawImage(wallpaper, 0, 0, 1024, 500);

        let filtro = await Canvas.loadImage('https://i.ibb.co/JztzWW1/filtro.png');
        ctx.drawImage(filtro, 0, 0);

        let pfp = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 65px Arial Unicode MS';
        let txt = `¡Hola ${member.displayName}!`;
        ctx.textAlign = "center";
        ctx.fillText(txt, 512, 370);

        ctx.font = 'bold 50px Arial Unicode MS';
        txt = `Eres el miembro ${guild.memberCount}°`;
        let x = canvas.width / 2 - ctx.measureText(txt).width / 2;
        ctx.fillText(txt, 512, 435);

        ctx.beginPath();
        ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.clip();
        await ctx.drawImage(pfp, 393, 47, 238, 238);

        let attach = new MessageAttachment(canvas.toBuffer());
        try { canal.send(texto, attach); } catch (error) { return }

    } else return;
})