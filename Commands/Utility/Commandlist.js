const Command = require("../../Command");
const Embed = require("../../Embed");

const NAME = "cmdlist";

class CommandList extends Command {
    constructor() {
        super(NAME, "Lists all available commands", "Utils", [], 0);
    }

    run(_msg, _args, _Bot) {
        _msg.channel.send(Embed.tccc(
            "Command list",
            "GREEN",
            Object.entries(_Bot.commands).map(obj => { return ` - ${obj[0]}` }),
            this.name
        ));
    }
}

module.exports = {
    "name": NAME,
    "obj": CommandList
}