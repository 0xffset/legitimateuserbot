const Discord = require("discord.js");

module.exports = {
    "name": "slots",
    "desc": "Play a round of slots",
    "args": ["bet"],
    run
}

let interval;
let symbols = [":tangerine:", ":lemon:", ":watermelon:", ":banana:", ":grapes:", ":cherries:", ":pineapple:", ":bell:", ":gem:"];
let game = [];
let count;
let out;
let display;

function slotEmbed() {
    display = [];
    let temp;

    for (let i = 0; i < 5; i++) {
        temp = [];
        if (count - i > 9) {
            for (let j = 0; j < 5; j++) {
                temp.push(game[i][9 + j]);
            }
        } else if (count - i < 0) {
            for (let j = 0; j < 5; j++) {
                temp.push(game[i][j]);
            }
        } else {
            for (let j = 0; j < 5; j++) {
                temp.push(game[i][count - i + j]);
            }
        }
        display.push(temp);
    }

    out = [[], [], [], [], []];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            out[j][i] = display[i][4 - j];
        }
    }

    return new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setTitle(" :slot_machine:  - Slots - :slot_machine: ")
        .setDescription(out.map(row => {
            return row.map(slot => {
                return slot;
            }).join("┃");
        }).join("\n"));
}

function doTheSpinning(msg, bet) {
    msg.edit(slotEmbed());

    count++;

    if (count === 14) {
        clearInterval(interval);
        let win = {};
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (!win[display[i][j]]) {
                    win[display[i][j]] = [false, false, false, false, false];
                }
                win[display[i][j]][i] = true;
            }
        }

        let winners = [];
        for (const [key, value] of Object.entries(win)) {
            if (value.every(val => { return val })) {
                winners.push(key);
            }
        }
        if (winners.length !== 0) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (!winners.includes(out[i][j])) {
                        out[i][j] = ":black_large_square:";
                    }
                }
            }
            msg.edit(new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setTitle(" :slot_machine:  - Slots - :slot_machine: ")
                .setDescription(out.map(row => {
                    return row.map(slot => {
                        return slot;
                    }).join("┃");
                }).join("\n")));
            msg.edit(`\`You won ${winners.length > 1 ? bet*winners.length : bet*2}\``);
        } else {
            msg.edit("`You lost :/`");
        }
    }
}

function run(msg, args, Bot) {
    if (!args[0] || isNaN(args[0])) {
        return msg.channel.send("Invalid bet!");
    }

    let temp;
    game = [];

    for (let i = 0; i < 5; i++) {
        temp = [];
        for (let j = 0; j < 15; j++) {
            temp.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
        game.push(temp);
    }

    count = 0;
    msg.channel.send(slotEmbed()).then(msg => {
        interval = setInterval(doTheSpinning, 1250, msg, args[0]);
    });
}