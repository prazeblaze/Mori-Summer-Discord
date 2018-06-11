const Discord = require("discord.js")
const moment = require('moment');
const _fs = require("fs");
const packages = require('../package.json');
require('moment-duration-format');
const os = require('os');
let cpu = os.cpus();

exports.run = (client, message, args, tools) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const servers = client.guilds.size;
    const client_channel = client.guilds.reduce((a, b) => a + b.channels.size, 0).toLocaleString();

    const owner = packages.author.name;

    const cpu = process.cpuUsage().system / 1024 / 1024;

    const users = client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
    const nodever = process.version
    const memory_on_bot = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)

    const embed = new Discord.RichEmbed({
        title: "Mori Summer Stats",
        url: "https://github.com/skymunn/Mori-Summer-Discord/",

        // warnanya ini, ente cari dalam bentuk hexa dulu
        // terus ente convert jadi desimal
        color: 15554891,

        footer: {
            text: `Mori Summer Project | 1 Shards`
        },
        author: {
            name: "Mori Summer | A Discord Bot",
            icon_url: "https://cdn.discordapp.com/avatars/451394160440770601/795d0d2e2e297a3aab3a3b3f9f994617.png",
            url: "https://github.com/skymunn/Mori-Summer-Discord"
        },
        fields: [
            { name: "Bot Uptime", value: `${duration}`, inline: true },
            { name: "Memory Usage", value: `${memory_on_bot} MB`, inline: true },
            { name: "Servers", value: `${servers} servers`, inline: true },
            { name: "Users", value: `${users} users`, inline: true},
            { name: "Node.js Version", value: `${nodever}`, inline: true },
            { name: "Library", value: "discord.js", inline: true },
            { name: "Creator", value: `${owner}`, inline: true },
            { name: "Bot Version", value: `${packages.version}`, inline: true},
            { name: "CPU Usage", value: `${Math.round(cpu * 100) / 100}%`, inline: true }
        ]
    }).setTimestamp();

    message.channel.send({ embed });
}