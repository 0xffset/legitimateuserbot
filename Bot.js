const Discord = require("discord.js");


class Bot {
    commands = {};
    prefixCache = {};
    mysqlink;
    botToken;
    client;

    constructor(_mysqlink, _token) {
        this.mysqlink = _mysqlink;
        this.botToken = _token;

        this.client = new Discord.Client();
    }

    addCommand(_command) {
        this.commands[_command.name] = _command.obj;
    }

    startBot() {
        this.client.login(this.botToken);
    }
}

exports.Bot = Bot;