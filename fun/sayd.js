const Discord = require("discord.js");

exports.run = (client, message, args, tools) => { 
    let embedarg = args.slice(0).join(' ');
    
    message.delete().catch(err => {return message.reply(`see? I can\'t delete it for you. You should enable **Manage Message** permission for me. \:smile\:`)});
    message.channel.send(`${embedarg}`);
}