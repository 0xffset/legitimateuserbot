const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "whoisyourdaddy",
    "desc": "List of bot masters",
    "args": [],
    run
}

function run(msg, args, Bot) {
    const botconfig = JSON.parse(fs.readFileSync(__dirname + "/../botconfig.json"));
    
    let out = "My dadd";
    if (botconfig.master.length > 1) {
        out += "ies are ";
    } else {
        out += "y is ";
    }

    for (const master of botconfig.master) {
        out += "<@" + master + "> ";
    }
    
    msg.channel.send("Uhhh :flushed:").then(message => {
        message.edit(`${out} :pleading_face:`);
    });
}