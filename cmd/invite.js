const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {
    const embed = new Discord.RichEmbed({
        color: 15554891,
        title: "Click here to invite this bot to your server!",
        url: "https://discordapp.com/api/oauth2/authorize?client_id=451394160440770601&permissions=519232&scope=bot"
    });
    message.channel.send({ embed });
}