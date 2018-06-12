const Discord = require('discord.js');
const cfg = require('../config.json')

exports.run = (client, message, args, cmd) => {
    if (!message.mentions.users.size) {
        let prefix = cfg.prefix;
        message.channel.send(`Lu kudu mention satu orang, macam \`${prefix}truno [mention]\``)
    } else {
        // ini biar bisa ngemention
        const mention = message.mentions.users.map(user => {
            return `${user.username}#${user.discriminator}`
        })
        message.channel.send(`+${mention.toString()} kontol`);
    }
}
