// variabel berbahaya
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const timestamp = require('time-stamp');
const client = new Discord.Client();
const tools = require('./functions.js');

// variabel untuk logs purposes
let date = timestamp('DD:MM:YYYY');
let time = timestamp('HH:mm:ss');
let botName = '[MoriSummerBot] '
let exeCom = '[ExecuteCommand] '
let invit = '[Invitation] '
const logTimeStamp = `[${date}|${time}] `
const readyLog = logTimeStamp + botName;
const executeLog = logTimeStamp + exeCom;
const inviteLog = logTimeStamp + invit;

// kondisi ketika bot rede
client.on('ready', () => {
    // Random status
    function randomStatus() {
        let project = `Mori Summer Project`
        let helpStatus = prefix + 'help';
        let genreSatu = ' | loli';
        let genreDua = ' | vanilla';
        let genreTiga = ' | netorare';
        let servers = ` | ${client.guilds.size}`;
        let users = client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
        let user = ` | ${users}`
        let status = [project, helpStatus + genreSatu, helpStatus + genreDua, helpStatus + genreTiga, helpStatus + `${user} users`, helpStatus + `${servers} servers`]
        let rstatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstatus], { type: 'WATCHING' });
    }; setInterval(randomStatus, 30000)

    console.log(readyLog + 'Bot has been successfully deployed!');
});

// Invite status log
client.on("guildCreate", guild => {
    console.log(inviteLog + `Invited bot to: ${guild.name} with ${guild.memberCount} members, created by ${guild.owner.user.username}`)
});

// Kicking my bot in ur guild, reeeee
client.on("guildDelete", guild => {
    console.log(inviteLog + `Kicked from: ${guild.name}. created by ${guild.owner.user.username}`)
});

// list untuk command handler, tetapan
// START
client.on('message', message => {

    // ketika bot dimention
    //const ClientMention = new RegExp(`^<@!?${client.user.id}>`);
    //if (message.content.match(ClientMention)) {
    //    console.log(executeLog + `${message.author.tag} was mention the bot.`)
    //    return message.reply(`the prefix is \**\`${prefix}\`\**`);
    //}

    // Variables
    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Return Statements
    if (!msg.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return

    // Command Handler
    try {
        let commandFile = require(`./cmd/${cmd}.js`);
        commandFile.run(client, message, args, tools);
    } catch (e) {
        // logika dasar, nimpah catchnya untuk secret command
        try {
            let featureFile = require(`./nimeg/${cmd}.js`);
            featureFile.run(client, message, args, tools);            
        }
        catch (e) { 
            try {
                let funFile = require(`./fun/${cmd}.js`);
                funFile.run(client, message, args, tools);
            }
            catch (e) {
                console.log(executeLog + `An error occured: ${e.message}`) 
            }
        }
    } finally {
        console.log(executeLog + `${message.author.tag} execute command: ${cmd}`);
    }

});
// STOP

client.login(token);