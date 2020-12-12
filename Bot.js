const Discord = require("discord.js");

module.exports = {
    "client": new Discord.Client(),
    "commands": {},
    "prefix": "",
    assertCommand,
}

function assertCommand(command, message) {
    if (this.commands[command] != undefined)
        this.commands[command].run(message, message.content.split(" ").slice(1), this);
}