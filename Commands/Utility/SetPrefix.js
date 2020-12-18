const Command = require("../../Command");
const Embed = require("../../Embed");

const NAME = "prefix";

class Prefix extends Command {
    constructor() {
        super(NAME, "Change the prefix", "Utils", ["prefix"], 1);
    }

    run(_msg, _args, _Bot) {
        if (_args[0]) {
            if (_args[0].length < 3 && _args[0].length > 0) {
                _Bot.mysqlink.con.query("update discordbot.guild set prefix=? where id=?", [_args[0], _msg.guild.id], (err, res) => {
                    if (err)
                        return console.log(err);
                    
                    _Bot.prefixCache[_msg.guild.id] = _args[0];
    
                    _msg.channel.send(Embed.tcc(true, `Successfully changed the prefix to \`${_args[0]}\``, this.name));
                })
            } else {
                _msg.channel.send(Embed.tcc(false, "The prefix must be 1-3 characters", this.name));
            }
        } else {
            _msg.channel.send(Embed.tcc(false, "Please enter a prefix", this.name));
        }
    }
}

module.exports = {
    "name": NAME,
    "obj": Prefix
}