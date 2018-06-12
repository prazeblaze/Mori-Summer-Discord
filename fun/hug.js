const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {
    let mention = message.mentions.users.map(user => {return `${user.username}#${user.discriminator}`});
    let author = message.author.tag;
    let randomImage = [
        "https://media1.tenor.com/images/49a21e182fcdfb3e96cc9d9421f8ee3f/tenor.gif?itemid=3532079",
        "https://media1.tenor.com/images/b0de026a12e20137a654b5e2e65e2aed/tenor.gif?itemid=7552093",
        "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
        "http://gifimage.net/wp-content/uploads/2017/09/anime-hug-gif-2.gif",
        "https://i.pinimg.com/originals/f2/80/5f/f2805f274471676c96aff2bc9fbedd70.gif",
        "https://media1.tenor.com/images/5cd23c906465474946375ad0414f94e5/tenor.gif?itemid=8739843",
        "https://i.imgur.com/NICPTF6.gif",
        "https://vignette.wikia.nocookie.net/lady-bug/images/3/30/SVTFOE_-_Star_and_Marco_hug.gif/revision/latest?cb=20180119131758"
    ];
    let rImage = Math.floor(Math.random() * randomImage.length);
    let title = ``;

    // pake return biar ngalahin semua argumen
    if (!message.mentions.users.size) {
        return message.channel.send("Hey, you should mention user that you want to hug.")
    } else {
        title = `${author} hugging ${mention}.`
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