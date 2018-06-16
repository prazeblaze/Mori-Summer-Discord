const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {
    let randomNumber = Math.floor(Math.random() * 10);

    let wish = args.slice(0).join(' ');
    if (!wish) return message.reply("rate something, please.");

    message.reply(`I will rate \__${wish}\__ for \**${randomNumber}/10\** \:thinking\:`)
}