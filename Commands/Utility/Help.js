const Command = require("../../Command");
const Embed = require("../../Embed");

const NAME = "help";

class Help extends Command {
    constructor() {
        super(NAME, "Help for commands", "Utils", ["command"], 0);
    }

    // add permission level somewhere
    run(_msg, _args, _Bot) {
        if (_args.length == 0)
            return _msg.channel.send(
                Embed.tcc(
                    false,
                    `Insufficient arguments!\n\`${_Bot.prefixCache[_msg.guild.id]}cmdlist\` to get a list of all commands\n\nUsage:\n\`${_Bot.prefixCache[_msg.guild.id]}help [command]\``,
                    this.name
                ));
        else if (_Bot.commands[_args[0]] == undefined) {
            return _msg.channel.send(
                Embed.tcc(
                    false,
                    `Command \`${_args[0]}\` not found`,
                    this.name
                ));
        }

        const command = new _Bot.commands[_args[0]]();
        _msg.channel.send(Embed.tccc(
            `${_args[0]}`,
            "",
            `${command.description}\n\nUsage:\n\`${(_Bot.prefixCache[_msg.guild.id] + _args[0] + " " + command.args.map(arg => { return `[${arg}]` }).join(" ")).trim()}\``,
            this.name
        ));
    }
}

module.exports = {
    "name": NAME,
    "obj": Help
}
