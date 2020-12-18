const MessageEmbed = require("discord.js").MessageEmbed;

class ResultEmbed {
    // _type: true=Success, false=Error

    static tcr(_title, _commandName) {
        return new MessageEmbed()
            .setTitle(_title)
            .setColor("RED")
            .setFooter(`${_commandName} | ${new Date().toUTCString()}`);
    }

    static tcc(_type, _content, _commandName) {
        let title = _type ? "Success" : "Error";
        let color = _type ? "GREEN" : "RED";

        return new MessageEmbed()
            .setTitle(title)
            .setDescription(_content)
            .setColor(color)
            .setFooter(`${_commandName} | ${new Date().toUTCString()}`);
    }

    static tccc(_title, _color, _content, _commandName) {
        return new MessageEmbed()
            .setTitle(_title)
            .setDescription(_content)
            .setColor(_color)
            .setFooter(`${_commandName} | ${new Date().toUTCString()}`);
    }

    static ic(_imageURL, _commandName) {
        return new MessageEmbed()
            .setImage(_imageURL)
            .setFooter(`${_commandName} | ${new Date().toUTCString()}`);
    }
}

module.exports = ResultEmbed;