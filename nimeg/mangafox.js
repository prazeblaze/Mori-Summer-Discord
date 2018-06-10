// prazeblazeeeeeee was here
// you have no power >:)

const Discord = require('discord.js');
const mangaFox = require('./engine/mangafox-engine.js');

const domain = "http://fanfox.net";

convertToRichEmbedFields = (data) => {
  let list = [];
  for(let i = 0; i < data.length; i++){
    list[i] = {
      "name": `${i + 1}. ${data[i].title}`,
      "value": `ID: ${data[i].id}\nLink: [http:${data[i].href}](http:${data[i].href})`
    }
  }

  return list;
}

exports.run = (client, message, args, tools) => {
  // kalo gada args
  if(!args.length){
    message.channel.send('Welcome to Mangafox!');
  } else {
    // ini arg
    let arg = args[0];
    let option = args[1];

    try {
      switch(arg){
        case 'search':
          message.channel.send('Kalem dong');
          break;

        case 'n':
        case 'new':
          option = (args[1] ? args[1] : 10);
          mangaFox.getNew(option, (res) => {
            const mangaList = convertToRichEmbedFields(res);
            
            const embed = new Discord.RichEmbed({
              "title": "MangaFox New Manga List",
              "description": `**Hei, ${message.author}!**\nBerikut adalah list top ${option} manga tersegar di MangaFox saat ini 💦`,
              "url": domain,
              "color": 1467591,
              "footer": {
                "icon_url": message.author.displayAvatarURL,
                "text": "Mori Summer Project"
              },
              "thumbnail": {
                "url": "https://pbs.twimg.com/profile_images/1758860726/icon_400x400.png"
              },
              "fields": mangaList
            }).setTimestamp();

            message.channel.send({ embed });
          });
          break;
        
        case 'p':
        case 'popular':
        option = (args[1] ? args[1] : 10);
          mangaFox.getPopular(option, (res) => {

            const mangaList = convertToRichEmbedFields(res);
            
            const embed = new Discord.RichEmbed({
              "title": "MangaFox Popular Manga List",
              "description": `**Hei, ${message.author}!**\nBerikut adalah list top ${option} manga terpopuler di MangaFox saat ini 👌`,
              "url": domain,
              "color": 1467591,
              "footer": {
                "icon_url": message.author.displayAvatarURL,
                "text": "Mori Summer Project"
              },
              "thumbnail": {
                "url": "https://pbs.twimg.com/profile_images/1758860726/icon_400x400.png"
              },
              "fields": mangaList
            }).setTimestamp();

            message.channel.send({ embed });
          });
          break;
        
        default:
          message.channel.send('Perintah tidak dikenal!');
          break;
      }
    } catch(e) {
      message.channel.send('ERROR PANTEK! CEK LOG');
    }
  }
};