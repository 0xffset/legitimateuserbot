const Discord = require("discord.js");

module.exports = {
    "name": "cmdlist",
    "desc": "Lists all available commands",
    "args": [],
    run
}

function run(msg, args, Bot) {
    msg.channel.send(new Discord.MessageEmbed()
        .setAuthor("Command list")
        .setDescription(Object.entries(Bot.commands).map(obj => { return obj[0] })));
}