const Discord = require("discord.js");

module.exports = {
    "name": "help",
    "desc": "Help for specific commands",
    "args": ["command"],
    run
}

function run(msg, args, Bot) {
    if (args.length == 0)
        return msg.channel.send(new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`Insufficient arguments!\n\`${Bot.prefix}cmdlist\` to get a list of all commands\n\nUsage:\n\`${Bot.prefix}help [command]\``));
    else if (Bot.commands[args[0]] == undefined) {
        return msg.channel.send(new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`Command \`${args[0]}\` not found`));
    }

    msg.channel.send(new Discord.MessageEmbed()
        .setAuthor(`${args[0]}`)
        .setDescription(`${Bot.commands[args[0]].desc}\n\nUsage:\n\`${(Bot.prefix + args[0] + " " + Bot.commands[args[0]].args.map(arg => { return `[${arg}]` }).join(" ")).trim()}\``));
}
