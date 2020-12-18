const Command = require("../../Command");
const Embed = require("../../Embed");

const fs = require("fs");

const NAME = "whoisyourdaddy";

class WhoIsYourDaddy extends Command {
    constructor() {
        super(NAME, "List of bot masters", "Utils", [], 0);
    }

    run(_msg, _args, _Bot) {
        const botconfig = JSON.parse(fs.readFileSync(__dirname + "/../../botconfig.json"));
        
        let out = "My dadd";
        if (botconfig.master.length > 1) 
            out += "ies are ";
        else 
            out += "y is ";
    
        botconfig.master.map(key => {
            out += "<@" + key + "> ";
        });
        
        _msg.channel.send(Embed.tcr("Uhhh :flushed:", this.name)).then(message => {
            message.edit(Embed.tccc("", "", `${out} :pleading_face:`, this.name));
        });
    }
}

module.exports = {
    "name": NAME,
    "obj": WhoIsYourDaddy
}