const Discord = require("discord.js");

exports.run = (client, message, args, tools) => {

    // thanks to dwii, you're save me

    let user = message.mentions.users.first();
    let author = message.author;
    user = user ? user : author;

    let status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline"
    }

    let colorstatus = {
        online: 2746896,
        idle: 16249617,
        dnd: 15339536,
        offline: 0
    }    
    
    let uEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s Info`, user.displayAvatarURL)
    .setDescription(``)
    .setThumbnail(user.displayAvatarURL)
    .setColor(colorstatus[user.presence.status])
    .addField("ID", user.id, true)
    .addField("Username", user.username, true)
    .addField("Status", status[user.presence.status], true)
    .addField("Bot", user.bot ? `This is ROBOT` : `This is HUMAN`, true);

    message.channel.send(uEmbed).catch(err => message.channel.send("You lack the **Embed Links** permission!"));
    
}
