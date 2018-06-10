const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    let author = "";
    let picture = "";

    if (!message.mentions.users.size) {

        author = "Your avatar:";
        picture = message.author.displayAvatarURL;
        
    } else {

        const mention = message.mentions.users.map(user => {
            return `${user.username}`
        });
        const pict = message.mentions.users.map(user => {
            return `${user.displayAvatarURL}`
        });

        author = `${mention.toString()}'s avatar:`;
        picture = pict.toString();
    }

    const embed = new Discord.RichEmbed({
        author: { name: author, url: picture },
        description: `Click the \`${author}\` above this to get the link!`,
        color: 15554891,
        image: { url: picture }
    });

    message.channel.send({ embed });
    
}