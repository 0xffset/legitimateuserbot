const fs = require("fs");
const botconfig = JSON.parse(fs.readFileSync(__dirname + "/botconfig.json"));

const BotClass = require("./Bot");
const processEntry = require("./processEntry");
const MySQLink = require("./MySQLink");

const Bot = new BotClass.Bot(new MySQLink.MySQLink(botconfig.hostDB, botconfig.userDB, botconfig.passwordDB, botconfig.schemeDB), botconfig.token);


const commandDir = fs.readdirSync('Commands').map(entry => {
    return processEntry(`Commands/${entry}`);
}).flat();

// initilize all commands
for (const file of commandDir) {
    const command = require(`./Commands/${file}`);
    Bot.addCommand(command);
    console.log("Loaded command: " + command.name);
}

Bot.client.on("guildCreate", guild => {
    Bot.mysqlink.con.query("insert into discordbot.guilds (id, prefix) values (?, ?)", [guild.id, "."], (err, res) => {
        if (err)
            return console.log(err);
    });
    Bot.prefixCache[guild.id] = ".";
});


Bot.client.on("ready", () => {
    Bot.client.user.setActivity("you", { type: "WATCHING" });

    Bot.mysqlink.con.query("select * from discordbot.guild", (err, res) => {
        if (err)
            return err;

        res.map(cur => { Bot.prefixCache[cur.id] = cur.prefix });
    });
    console.log("Ready...");
});

Bot.client.on("message", message => {
    if (!message.author.bot) {
        let prefix = Bot.prefixCache[message.guild.id];
        if (message.content.startsWith(prefix)) {
            let args = message.content.split(/\s+/g);
            let command = args.shift().substring(prefix.length);
            if (Bot.commands[command])
                new Bot.commands[command]().run(message, args, Bot);
        }
    }
});


Bot.startBot();