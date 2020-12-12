const Discord = require("discord.js");

module.exports = {
    "name": "ping",
    "desc": "Checks the ping of the bot and API",
    "args": [],
    run
}

function run(msg, args, Bot) {
    msg.channel.send(new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription("Ping?")).then(message => {
            message.edit(new Discord.MessageEmbed()
                .setColor("#00FF00").setAuthor("Pong!")
                .setDescription(`Latency: \`${message.createdTimestamp - msg.createdTimestamp}\`ms \nAPI Latency: \`${Math.round(Bot.client.ws.ping)}\`ms`));
    });
}
