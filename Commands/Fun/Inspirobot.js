const Command = require("../../Command");
const Embed = require("../../Embed");

const got = require("got");

const NAME = "inspire";

class InspiroBot extends Command {
    constructor() {
        super(NAME, "Gives you inspiration when you need it the most :)", "Fun", [], 0);
    }

    run(_msg, _args, _Bot) {
        got("https://inspirobot.me/api?generate=true").then(res => {
            _msg.channel.send(Embed.ic(res.body, this.name));
        }, err => {
            _msg.channel.send(Embed.tcc(false, "Something went wrong :/", this.name));
            _Bot.client.guilds.fetch("729317146127106059").then(guild => {
                guild.member("217567653210882049").send(`Inspirobot error:\n\`\`\`${err}\`\`\``);
            });
            console.log(err);
        });
    }
}


module.exports = {
    "name": NAME,
    "obj": InspiroBot
}