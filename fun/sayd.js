const Discord = require("discord.js");

exports.run = (client, message, args, tools) => { 
    let embedarg = args.slice(0).join(' ');
    message.delete();
    message.channel.send(`${embedarg}`) 
};