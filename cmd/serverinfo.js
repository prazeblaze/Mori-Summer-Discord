const Discord = require("discord.js");
const dateformat = require("dateformat");

exports.run = (client, message, args, tools) => {

	let region = {
		"brazi": "Brazil",
		"eu-central": "Central Europe",
        "singapore": "Singapore",
        "us-central": "U.S. Central",
        "sydney": "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "singapore": "Singapore",
        "london": "London",
        "japan": "Japan",
        "russia": "Russia",
        "hongkong": "Hong Kong"
	}
	let icon;
	if (message.guild.iconURL) {
	    icon = message.guild.iconURL
	}
	if (!message.guild.iconURL) {
	    icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Blue_computer_icon.svg/2000px-Blue_computer_icon.svg.png"
	}
	let owner = message.guild.owner.user
	if (!owner) {
	    owner = "None for some reason..."
    };
    
    const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻ (High)', '┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻ (Extreme)'];
  function generateHex() {
    return '#'+ Math.floor(Math.random() * 16777215).toString(16);
  }
  
        const embed = new Discord.RichEmbed({
            title: `${message.guild} | ${message.guild.owner.user.tag}`,
            thumbnail: {url: message.guild.iconURL},
            footer: {
                icon_url: "https://cdn.discordapp.com/avatars/451394160440770601/795d0d2e2e297a3aab3a3b3f9f994617.png",
                text: "Mori Summer Project"
            },
            fields: [
                {name: "Channels", value: `${message.guild.channels.size} channels`, inline: true},
                {name: "Members", value: `${message.guild.members.size} users`, inline: true},
                {name: "Region", value: `${region[message.guild.region]}`, inline: true},
                {name: "Server ID", value: message.guild.id, inline: true},
                {name: "Verification Level", value: verificationLevels[message.guild.verificationLevel], inline: true},
                {name: "Server Created Date", value: dateformat(message.guild.createdAt, "dddd, mmmm dS, yyyy, h:MM TT"), inline: true},
                {name: "Roles", value: message.guild.roles.array().join(" | "), inline: true}
            ]
        }).setTimestamp();

        message.channel.send({embed})
    }