// jujur, gua tipenya orang yang ngetik kode pake gaya
// Spagheti Code, gatau dari jaman VB.Net gua sering nyimpen
// variabel semena-mena, jadi tolong para programmer yang
// melihat proyek ini, jangan trigger ya kalau style codenya
// bukan Ravioli Code wkwkwkw

const Discord = require('discord.js');
const { prefix } = require('../config.json');

exports.run = (client, message, args, tools) => {

  // core help
  if (!args.length) {
    const embed = new Discord.RichEmbed({
      title: "Command List",

      // semisal lu enter disini, hasilnya juga bakal keenter
      // walau lu ga pake "\n" dibelakang teksnya
      description: `Click the \`Command List\` above here for more information about the entire commands.
                    \nOr, type \`${prefix}help [command_name]\` for more information.
                    \nHere's a list of all my commands:\n`,

      url: "https://github.com/skymunn/Mori-Summer-Discord/wiki",

      // warnanya ini, ente cari dalam bentuk hexa dulu
      // terus ente convert jadi desimal
      color: 15554891,

            footer: {
                icon_url: "https://cdn.discordapp.com/avatars/451394160440770601/795d0d2e2e297a3aab3a3b3f9f994617.png",
                text: "Mori Summer Project"
            },
            thumbnail: {
                url: "https://cdn.discordapp.com/avatars/451394160440770601/795d0d2e2e297a3aab3a3b3f9f994617.png"
            },
            author: {
                name: "Mori Summer | A Discord Bot",
                url: "https://github.com/skymunn/Mori-Summer-Discord"
            },
            fields: [
                {
                    name: "Core",
                    value: "`help` `ping` `info` `invite`",
                    inline: true

                },
                {
                    name: "Utility",
                    value: "`avatar` `serverinfo` `userinfo`",
                    inline: true
                },
                {
                    name: "Weebs Purposes",
                    value: "`nhentai` `mangafox` `saucenao` `anime`",
                    inline: true
                },
                {
                    name: "Fun",
                    value: "`f` `hug` `say` `sayd`",
                    inline: true
                },
                {
                    name: "Some Links",
                    value: "[GitHub Repository](https://github.com/skymunn/Mori-Summer-Discord) | Discord Bot Library | Support Server",
                    inline: false
                }
            ]
        }).setTimestamp();
        message.channel.send({ embed }).catch(err => message.channel.send("You lack the **Embed Links** permission!"));

        // dynamically help feature
    } else if (args.length) {

        // ngambil beberapa sampel
        let arg = args[0];
        let title = `${prefix}${arg}`;
        let description = "";
        let example = ``;

        // daripada buat embed baru lagi, boros space cok

        // anti embed message
        if (arg === 'help') {
            message.channel.send(`Hey folk, just type \`${prefix}${arg}\` rite?`)
        } else {
            // embed message
            // gua suka yang mepet bro
            // core 
            if (arg === 'ping') {
                description = "To give you a PONG respond.";
                example = `\`${prefix}${arg}\``
            } else if (arg === 'info') {
                description = "About this bot."
                example = `\`${prefix}${arg}\``
            } else if (arg === 'invite') {
                description = "Invite this bot to another server.\nBut, you should have Administration permission in the server.";
                example = `\`${prefix}${arg}\``
            }

            // utility
            else if (arg === 'avatar') {
                description = "Make your profile picture or your friend profile picture get bigger.";
                example = `Self avatar: \`${prefix}${arg}\`\nYour friend avatar: \`${prefix}${arg} [mention]\``
            } else if (arg === 'serverinfo') {
                description = "Give you some information about the server."
                example = `\`${prefix}${arg}\``
            } else if (arg === 'userinfo') {
                description = "Give you some information about your stats or your friend stats in this server.";
                example = `Your information: \`${prefix}${arg}\`\nYour friend information: \`${prefix}${arg} [mention]\``
            }

            // manga and doujin site
            else if (arg === 'mangafox'){
                description = "Get some fresh manga from MangaFox library.";
                example = `Currently I have only two options for the first argument, which is 'popular' and 'new'. \nBy default I will output only the top 10 mangas, but you can specify the limit on second arg. \n\`${prefix}${arg} [options] [list limit] \``;
            } else if (arg === `nhentai`) {
                description = "Searching doujin/manga from nHentai library. \nYOU WILL NEED A NSFW CHANNEL TO EXECUTE THIS!";
                example = `You can search for more than one genre. \n\`${prefix}${arg} [genre1] [genre2] [genre3] ....\``
            } else if (arg === 'anime') {
                description = "Searching anime in MAL Database."
                example = `null`
            }

            // fun, but actually it's just a meem
            else if (arg === 'f') {
                description = "Give your friend some respect."
                example = `\`${prefix}${arg}\` or \`${prefix}${arg} [mention]\``
            } else if (arg === 'hug') {
                description = "Hug your friend."
                example = `\`${prefix}${arg} [mention]\``
            } else if (arg === 'say') {
                description = "You can say something as bot, without deleting your command."
                example = `\`${prefix}${arg} [caption]\``
            } else if (arg === 'sayd') {
                description = "You can say something as bot and delete your history command. \nBut, you should give me \**Manage Message\** permission."
                example = `\`${prefix}${arg} [caption]\``
            }

        // rangka untuk dynamically help
        const embed = new Discord.RichEmbed({
            title: `${title} command`,
            url: "https://github.com/skymunn/Mori-Summer-Discord/wiki",
            description: description,
            color: 15554891,
            footer: {
                icon_url: "https://cdn.discordapp.com/avatars/451394160440770601/795d0d2e2e297a3aab3a3b3f9f994617.png",
                text: "Mori Summer Project"
            },
            fields: [
                {
                    name: "Example",
                    value: example,
                }
            ]
        }).setTimestamp();
        message.channel.send({ embed }).catch(err => message.channel.send("You lack the **Embed Links** permission!"));
        }
    }
}