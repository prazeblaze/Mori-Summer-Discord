const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {
    message.channel.send(`\:ping_pong: Pong (${client.ping}ms)`);
}