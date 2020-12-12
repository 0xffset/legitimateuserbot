const Discord = require("discord.js");

module.exports = {
    "name": "therapy",
    "desc": "Your personal therapist always there for you [REWORK INCOMING]",
    "args": [],
    "data": ["It's okay, let it all out.", "I understand...", "Why do you think is that the case?", "Have you talked with someone about it?", 
             "And yet you never give up :)", "How do you plan to resolve this?", "I'm sorry to hear that.", "Why do you think like that?"],
    run
}

function run(msg, args, Bot) {
    msg.channel.startTyping();
    setTimeout(msg => {
        msg.channel.send(this.data[Math.floor(Math.random() * Math.floor(this.data.length))]);
        msg.channel.stopTyping();
    }, 1500, msg);
}
