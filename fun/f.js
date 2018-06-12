const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {
    let mention = message.mentions.users.map(user => {return `${user.username}#${user.discriminator}`});
    let author = message.author.tag;
    let randomImage = [
        "https://i.imgur.com/zrNE05c.gif", 
        "https://thumbs.gfycat.com/SecondhandMindlessEyelashpitviper-size_restricted.gif", 
        "http://i0.kym-cdn.com/photos/images/facebook/000/858/776/f2e.jpg_large",
        "https://cdn.discordapp.com/attachments/455155301918834698/456082720947175431/unknown.png"
    ];
    let rImage = Math.floor(Math.random() * randomImage.length);
    let title = ``;

    if (!message.mentions.users.size) {
        title = `${author} give some respect.`
    } else {
        title = `${author} give some respect to ${mention}.`
    }

    try {
        let embed = new Discord.RichEmbed({
            title: `${title}`,
            image: {url: randomImage[rImage]}
        }).setTimestamp();     
        message.channel.send({embed});   
    } catch (e) {
        process.on('unhandledRejection', console.error);
    } 
}