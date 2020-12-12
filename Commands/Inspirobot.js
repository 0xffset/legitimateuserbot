const Discord = require("discord.js");
const got = require("got");

module.exports = {
    "name": "inspire",
    "desc": "Gives you inspiration when you need it the most :)",
    "args": [],
    run
}

function run(msg, args, Bot) {
    got("https://inspirobot.me/api?generate=true").then(res => {
        msg.channel.send(res.body);
    }, err => {
        msg.channel.send("Something went wrong :/");
        Bot.client.guilds.fetch("729317146127106059").then(guild => {
            guild.member("217567653210882049").send(`Inspirobot error:\n\`\`\`${err}\`\`\``);
        });
        console.log(err);
    });
}