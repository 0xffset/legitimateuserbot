const Command = require("../../Command");
const Embed = require("../../Embed");

const NAME = "ping";

class Ping extends Command {
    constructor() {
        super(NAME, "Checks the ping of the bot and API", "Utils", [], 0);
    }

    run(_msg, _args, _Bot) {
        _msg.channel.send(Embed.tcr("Ping?", this.name)).then(message => {
                message.edit(Embed.tccc(
                    "Pong!",
                    "GREEN",
                    `Latency: \`${message.createdTimestamp - _msg.createdTimestamp}\`ms
                        API Latency: \`${Math.round(_Bot.client.ws.ping)}\`ms`,
                    this.name
                ));
            });
    }
}


module.exports = {
    "name": NAME,
    "obj": Ping
}