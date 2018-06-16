const Discord = require("discord.js");

exports.run = (client, message, args, tools) => {
    let wish = args.slice(0).join(' ');
    let author = message.author.username;

    // https://en.wikipedia.org/wiki/Magic_8-Ball
    let _8ballReference = [
        //affirmative answers
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",

        //non-committal answers
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and try again.",

        //negative answers
        "Don't count on in.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful."
    ]
    let random8ball = Math.floor(Math.random() * _8ballReference.length);

    if (!wish) return message.reply("ask him something.");
    message.channel.send(`\:8ball\: | ${_8ballReference[random8ball]} **${author}**`);
}