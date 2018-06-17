// prazeblazeeeeeee was here
// you have no power >:)

// Lib
const Discord = require('discord.js');
const MAL = require('./engine/mal-engine.js');

// MAL Domain
const domain = "https://myanimelist.net";

convertToRichEmbedFields = (data) => {
  let list = [];
  for(let i = 0; i < data.length; i++){
    list.push({
      "name": `${i + 1}. ${data[i].title}`,
      "value": `ID: ${data[i].id}\nLink: [${data[i].href}](${data[i].href})`
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
        case 'p':
        case 'popular':
        case 't':
        case 'top':
          // if no arg is supplied or supplied arg is not a number, set to default
          option = (option || !isNaN(parseInt(option)) ? args[1] : 10);

          MAL.getPopular(domain, option, (err, res) => {
            if(err === 'DEBUG_MODE'){ 
              message.channel.send(`It's 👏👏 DEBUG 👏👏 MODE 👏👏 \`\`\`\n${res}\`\`\``);
            } else if(err === 'BASIC_ERROR'){
              message.channel.send(res);
            } else if(err === 'GENERIC_ERROR'){
              message.channel.send(`Oops, it seems we're getting troubled over here. \nPlease try again in a few moments 😥\n\nError Details: \`\`\`\n${res}\`\`\``);
            } else {
              const animeList = convertToRichEmbedFields(res);
              
              const embed = new Discord.RichEmbed({
                "title": "MyAnimeList Top Anime List",
                "description": `**Hey, ${message.author}!**\nHere's the current list of the top ${option} most popular anime 🔥`,
                "url": `${domain}/topanime.php`,
                "color": 3035554,
                "footer": {
                  "icon_url": message.author.displayAvatarURL,
                  "text": "Mori Summer Project"
                },
                "thumbnail": {
                  "url": "https://myanimelist.cdn-dena.com/img/sp/icon/apple-touch-icon-256.png"
                },
                "fields": animeList
              }).setTimestamp();

              message.channel.send({ embed });
            }
          });
          break;

        case 's':
        case 'search':
          // if no arg is supplied or supplied arg is not a number, set to default
          let listCount = (args[2] || !isNaN(parseInt(args[2])) ? args[2] : 10);

          MAL.search(domain, {searchQuery: args[1], listCount: listCount}, (err, res) => {
            if(err === 'DEBUG_MODE'){ 
              message.channel.send(`It's 👏👏 DEBUG 👏👏 MODE 👏👏 \`\`\`\n${res}\`\`\``);
            } else if(err === 'BASIC_ERROR'){
              message.channel.send(res);
            } else if(err === 'GENERIC_ERROR'){
              message.channel.send(`Oops, it seems we're getting troubled over here. \nPlease try again in a few moments 😥\n\nError Details: \`\`\`\n${res}\`\`\``);
            } else {
              let searchResult = '';
              const indexNumbers = [...Array(listCount).keys()].map(v => 1 + v);

              res.forEach((current, index) => {
                searchResult += `[${index+1}] ${current.title}\n`;
              });
              
              const embed = new Discord.RichEmbed({
                "title": "MyAnimeList Anime Search",
                "description": `Yo, here's the search result! 👌\nType an index number from below to see the details about that specific anime.\`\`\`\n${searchResult}\`\`\``,
                "url": `${domain}/anime.php?q=${encodeURIComponent(option)}&type=0&score=0&status=0&p=0&r=0&sm=0&sd=0&sy=0&em=0&ed=0&ey=0&c%5B%5D=a&c%5B%5D=b&c%5B%5D=c&c%5B%5D=f&gx=0`,
                "color": 3035554,
                "footer": {
                  "icon_url": message.author.displayAvatarURL,
                  "text": "Mori Summer Project"
                }
              }).setTimestamp();

              handleRichEmbed = (err, res) => {
                if(err === 'DEBUG_MODE'){ 
                  message.channel.send(`It's 👏👏 DEBUG 👏👏 MODE 👏👏 \`\`\`\n${res}\`\`\``);
                } else if(err === 'BASIC_ERROR'){
                  message.channel.send(res);
                } else if(err === 'GENERIC_ERROR'){
                  message.channel.send(`Oops, it seems we're getting troubled over here. \nPlease try again in a few moments 😥\n\nError Details: \`\`\`\n${res}\`\`\``);
                } else {
                  const embed = new Discord.RichEmbed({
                    "title": "MyAnimeList Anime Details",
                    "description": `**Hey, ${message.author}!**\nHere's the info on the anime you just requested 💯`,
                    "url": res.url,
                    "color": 3035554,
                    "footer": {
                      "icon_url": message.author.displayAvatarURL,
                      "text": "Mori Summer Project"
                    },
                    "thumbnail": {
                      "url": "https://myanimelist.cdn-dena.com/img/sp/icon/apple-touch-icon-256.png"
                    },
                    "image": {
                      "url": res.cover
                    },
                    "fields": [
                      {
                        "name": res.title,
                        "value": truncateString(`**ID**: ${res.id}\n**Title:** ${res.title}\n**Type:** ${res.type} (${res.episodes} Episodes)\n**Status:** ${res.status} (${res.aired})\n**Producers:** ${res.producers}\n**Studios:** ${res.studios}\n**Genres:** ${res.genres}\n**Score:** ${res.score} (${res.scoreCount} users)\n**Rating:** ${res.rating}\n**Link:** ${res.url}`, 1021)
                      }
                    ]
                  }).setTimestamp();
      
                  message.channel.send({ embed });
                }
              }

              handleResponse = (collected) => {
                MAL.getAnimeDetails(domain, res[collected.first().content - 1].id, handleRichEmbed);
              }

              awaitResponse = () => {
                message.channel.awaitMessages(response => indexNumbers.includes(parseInt(response.content)), {
                  max: 1,
                  time: 60000,
                  error: ['time']
                })
                .then(handleResponse)
                .catch((err) => {
                  message.channel.send(`Time's up, ${message.author} 😐\nPlease initiate another search.`);
                });
              }

              message.channel.send({ embed }).then(awaitResponse);
            }
          });
          break;

        case 'i':
        case 'info':
          MAL.getAnimeDetails(domain, option, (err, res) => {
            if(err === 'DEBUG_MODE'){ 
              message.channel.send(`It's 👏👏 DEBUG 👏👏 MODE 👏👏 \`\`\`\n${res}\`\`\``);
            } else if(err === 'BASIC_ERROR'){
              message.channel.send(res);
            } else if(err === 'GENERIC_ERROR'){
              message.channel.send(`Oops, it seems we're getting troubled over here. \nPlease try again in a few moments 😥\n\nError Details: \`\`\`\n${res}\`\`\``);
            } else {
              const embed = new Discord.RichEmbed({
                "title": "MyAnimeList Anime Details",
                "description": `**Hey, ${message.author}!**\nHere's the info on the anime you just requested 💯`,
                "url": res.url,
                "color": 3035554,
                "footer": {
                  "icon_url": message.author.displayAvatarURL,
                  "text": "Mori Summer Project"
                },
                "thumbnail": {
                  "url": "https://myanimelist.cdn-dena.com/img/sp/icon/apple-touch-icon-256.png"
                },
                "image": {
                  "url": res.cover
                },
                "fields": [
                  {
                    "name": res.title,
                    "value": truncateString(`**ID**: ${res.id}\n**Title:** ${res.title}\n**Type:** ${res.type} (${res.episodes} Episodes)\n**Status:** ${res.status} (${res.aired})\n**Producers:** ${res.producers}\n**Studios:** ${res.studios}\n**Genres:** ${res.genres}\n**Score:** ${res.score} (${res.scoreCount} users)\n**Rating:** ${res.rating}\n**Link:** ${res.url}`, 1021)
                  }
                ]
              }).setTimestamp();

              message.channel.send({ embed });
            }
          });
          break;

        default:
          break;

      }
    } catch(err) {
      console.error(err);
      message.channel.send("Oops, sorry. I'm having trouble over here :<")
    }
  }
};