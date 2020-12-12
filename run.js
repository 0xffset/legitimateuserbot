const fs = require("fs");
const botconfig = JSON.parse(fs.readFileSync(__dirname + "/botconfig.json"));
const Bot = require("./Bot");
Bot.prefix = botconfig.prefix;

const commandDir = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

// initilize all commands
for (const file of commandDir) {
    const command = require(`./Commands/${file}`);
    Bot.commands[command.name] = command;
    console.log("Loaded command: " + command.name);
}


Bot.client.on("ready", () => {
    Bot.client.user.setActivity("you", { type: "WATCHING" });
    console.log("Ready...");
});


Bot.client.on("message", message => {
    if (!message.author.bot && message.content.startsWith(Bot.prefix)) {
        let i = message.content.indexOf(" ");
        Bot.assertCommand(message.content.substring(Bot.prefix.length, i != -1 ? i : message.content.length), message);
    }
});


Bot.client.login(botconfig.token);