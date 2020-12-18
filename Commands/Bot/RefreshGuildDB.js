const Command = require("../../Command");
const Embed = require("../../Embed");

const fs = require("fs");

const NAME = "refreshGuilds";

class RefreshGuilds extends Command {
    constructor() {
        super(NAME, "Updates the DB with all guilds the bot is in", "Bot", [], 2);
    }

    run(_msg, _args, _Bot) {
        if (!JSON.parse(fs.readFileSync(__dirname + "/../../botconfig.json")).master.includes(_msg.author.id))
            return _msg.channel.send("You need to be bot master to use that command");

        _Bot.mysqlink.con.query("select id from discordbot.guild", (err, res) => {
            if (err)
                return console.log(err);

            let outOfSync = [];
            _Bot.client.guilds.cache.forEach(guild => {
                if (!res.some(dbGuild => { return dbGuild.id == guild.id }))
                    outOfSync.push(`insert into discordbot.guild (id, prefix) values (${guild.id}, '.')`);
            });
            if (outOfSync.length != 0) {
                _Bot.mysqlink.con.query(`begin;${outOfSync.join(";")};commit;`, (err, res) => {
                    if (err)
                        return console.log(err);
                });
            }
        });

        _msg.channel.send(Embed.tcc(true, "Successfully synced!", this.name));
    }
}

module.exports = {
    "name": NAME,
    "obj": RefreshGuilds
}
