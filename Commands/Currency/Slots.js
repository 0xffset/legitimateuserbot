const Command = require("../../Command");
const Embed = require("../../Embed");

const NAME = "slots";

// TODO: implement money system with db
class Slots extends Command {
    interval;
    symbols;
    game;
    count;
    out;
    display;

    slotEmbed() {
        this.display = [];
        let temp;

        for (let i = 0; i < 5; i++) {
            temp = [];
            if (this.count - i > 9)
                for (let j = 0; j < 5; j++)
                    temp.push(this.game[i][9 + j]);
            else if (this.count - i < 0)
                for (let j = 0; j < 5; j++)
                    temp.push(this.game[i][j]);
            else
                for (let j = 0; j < 5; j++)
                    temp.push(this.game[i][this.count - i + j]);

            this.display.push(temp);
        }

        this.out = [[], [], [], [], []];
        for (let i = 0; i < 5; i++)
            for (let j = 0; j < 5; j++)
                this.out[j][i] = this.display[i][4 - j];

        return Embed.tccc(
            " :slot_machine:  - Slots -  :slot_machine: ",
            "GREEN",
            this.out.map(row => {
                return row.map(slot => {
                    return slot;
                }).join("┃");
            }).join("\n"),
            this.name
        )
    }

    doTheSpinning(_msg, _bet) {
        _msg.edit(this.slotEmbed());

        this.count++;

        if (this.count === 14) {
            clearInterval(this.interval);
            let win = {};
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (!win[this.display[i][j]])
                        win[this.display[i][j]] = [false, false, false, false, false];

                    win[this.display[i][j]][i] = true;
                }
            }

            let winners = [];
            for (const [key, value] of Object.entries(win))
                if (value.every(val => { return val }))
                    winners.push(key);

            if (winners.length !== 0) {
                for (let i = 0; i < 5; i++) 
                    for (let j = 0; j < 5; j++) 
                        if (!winners.includes(this.out[i][j])) 
                            this.out[i][j] = ":black_large_square:";
                            
                _msg.edit(Embed.tccc(
                    `\`You won ${winners.length > 1 ? _bet * winners.length : _bet * 2}\``,
                    "GREEN",
                    this.out.map(row => {
                        return row.map(slot => {
                            return slot;
                        }).join("┃");
                    }).join("\n"),
                    this.name
                ));
            } else {
                _msg.edit(_msg.embeds[0].setTitle("You lost").setColor("RED"));
            }
        }
    }

    run(_msg, _args, _Bot) {
        if (!_args[0] || isNaN(_args[0]))
            return _msg.channel.send(Embed.tcc(false, "Invalid input!", this.name));

        let temp;
        this.game = [];

        for (let i = 0; i < 5; i++) {
            temp = [];
            for (let j = 0; j < 15; j++)
                temp.push(this.symbols[Math.floor(Math.random() * this.symbols.length)]);

            this.game.push(temp);
        }

        this.count = 0;
        _msg.channel.send(this.slotEmbed()).then(_msg => {
            this.interval = setInterval((msg, arg) => { this.doTheSpinning(msg, arg); }, 1250, _msg, _args[0]);
        });
    }

    constructor() {
        super(NAME, "Play a round of slots", "Currency", ["bet"], 0);
        this.symbols = [":tangerine:", ":lemon:", ":watermelon:", ":banana:", ":grapes:", ":cherries:", ":pineapple:", ":bell:", ":gem:"];

        // this.slotEmbed.bind(this);
        // this.doTheSpinning.bind(this);
    }
}

module.exports = {
    "name": NAME,
    "obj": Slots
}