// prazeblazeeeeeee was here
// you have no power >:)

// Lib
const Discord = require('discord.js');
const mangaFox = require('./engine/mangafox-engine.js');

// Mangafox Domain
const domain = "http://fanfox.net";

convertToRichEmbedFields = (data) => {
  let list = [];
  for(let i = 0; i < data.length; i++){
    list.push({
      "name": `${i + 1}. ${data[i].title}`,
      "value": `ID: ${data[i].id}\nLink: [http:${data[i].href}](http:${data[i].href})`
    });
  }

  return list;
}

truncateString = (string, maxLength) => string.substr(0,maxLength-1)+(string.length>maxLength?'...':'');

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
        // Search for Mango
        case 'search':
          message.channel.send('This feature has not been implemented yet :(');
          break;

        // New Mango
        case 'n':
        case 'new':
          // if no arg is supplied or supplied arg is not a number, set to default
          option = (option || !isNaN(parseInt(option)) ? args[1] : 10); 

          mangaFox.getNew(domain, option, (err, res) => {
            if(err === 'DEBUG_MODE'){ 
              message.channel.send(`It's 👏👏 DEBUG 👏👏 MODE 👏👏 \`\`\`\n${res}\`\`\``);
            } else if(err === 'BASIC_ERROR'){
              message.channel.send(res);
            } else if(err === 'GENERIC_ERROR'){
              message.channel.send(`Oops, it seems we're getting troubled over here. \nPlease try again in a few moments 😥\n\nError Details: \`\`\`\n${res}\`\`\``);
            } else {
              const mangaList = convertToRichEmbedFields(res);
            
              const embed = new Discord.RichEmbed({
                "title": "MangaFox New Manga List",
                "description": `**Hey, ${message.author}!**\nHere's the current list of the top ${option} new mangas on MangaFox ✨`,
                "url": `${domain}/directory/new/`,
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
            }
          });
          break;
        
        // Popular Mango
        case 'p':
        case 'popular':
          // if no arg is supplied or supplied arg is not a number, set to default
          option = (option || !isNaN(parseInt(option)) ? args[1] : 10);

          mangaFox.getPopular(domain, option, (err, res) => {
            if(err === 'DEBUG_MODE'){ 
              message.channel.send(`It's 👏👏 DEBUG 👏👏 MODE 👏👏 \`\`\`\n${res}\`\`\``);
            } else if(err === 'BASIC_ERROR'){
              message.channel.send(res);
            } else if(err === 'GENERIC_ERROR'){
              message.channel.send(`Oops, it seems we're getting troubled over here. \nPlease try again in a few moments 😥\n\nError Details: \`\`\`\n${res}\`\`\``);
            } else {
              const mangaList = convertToRichEmbedFields(res);
              
              const embed = new Discord.RichEmbed({
                "title": "MangaFox Popular Manga List",
                "description": `**Hey, ${message.author}!**\nHere's the current list of the top ${option} most popular mangas on MangaFox 🔥`,
                "url": `${domain}/directory/`,
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
            }
          });
          break;
        
        // Recent Mango
        case 'r':
        case 'recent':
          // if no arg is supplied or supplied arg is not a number, set to default
          option = (option ? args[1] : 10); 
          
          mangaFox.getRecent(domain, option, (err, res) => {
            if(err === 'DEBUG_MODE'){ 
              message.channel.send(`It's 👏👏 DEBUG 👏👏 MODE 👏👏 \`\`\`\n${res}\`\`\``);
            } else if(err === 'BASIC_ERROR'){
              message.channel.send(res);
            } else if(err === 'GENERIC_ERROR'){
              message.channel.send(`Oops, it seems we're getting troubled over here. \nPlease try again in a few moments 😥\n\nError Details: \`\`\`\n${res}\`\`\``);
            } else {
              const mangaList = convertToRichEmbedFields(res);
              
              const embed = new Discord.RichEmbed({
                "title": "MangaFox Recent Manga List",
                "description": `**Hey, ${message.author}!**\nHere's the current list of the top ${option} most fresh mangas on MangaFox 💦`,
                "url": `${domain}/releases`,
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
            }
          });
          break;
        
        // Get Mango Info
        case 'i':
        case 'info':
          // console.log('mangafox.js ', domain, option);

          mangaFox.getMangaDetails(domain, option, (err, res) => {
            if(err === 'DEBUG_MODE'){ 
              message.channel.send(`It's 👏👏 DEBUG 👏👏 MODE 👏👏 \`\`\`\n${res}\`\`\``);
            } else if(err === 'BASIC_ERROR'){
              message.channel.send(res);
            } else if(err === 'GENERIC_ERROR'){
              message.channel.send(`Oops, it seems we're getting troubled over here. \nPlease try again in a few moments 😥\n\nError Details: \`\`\`\n${res}\`\`\``);
            } else {
              const embed = new Discord.RichEmbed({
                "title": "MangaFox Manga Details",
                "description": `**Hey, ${message.author}!**\nHere's the info on the manga you just requested 💯`,
                "url": res.url,
                "color": 65330,
                "footer": {
                  "icon_url": message.author.displayAvatarURL,
                  "text": "Mori Summer Project"
                },
                "thumbnail": {
                  "url": "https://pbs.twimg.com/profile_images/1758860726/icon_400x400.png"
                },
                "image": {
                  "url": res.cover
                },
                "fields": [
                  {
                    "name": res.title,
                    "value": truncateString(`**Title:** ${res.title}\n**Alternate Title(s)**: ${res.altTitle}\n**Link:** [${res.url}](${res.url})\n**Genres:** ${res.genre}\n**Author:** ${res.author}\n**Artist:** ${res.artist}\n**Rank:** #${res.rank}\n**Rating:** ${res.rating}\n**Release Date:** ${res.releaseDate}\n**Summary:**\n${res.summary}`, 1021)
                  }
                ]
              }).setTimestamp();

              message.channel.send({ embed });
            }
          });
          break;
        
        default:
          message.channel.send("Sorry, I don't understand.");
          break;
      }
    } catch(e) {
      console.error(e);
      message.channel.send("Oops, sorry. I'm having trouble over here :<");
    }
  }
};