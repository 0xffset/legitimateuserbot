class Command {
    name;
    description;

    // Utils, Fun, Bot, Currency
    category;
    args;

    // 0=Everyone, 1=Trusted, 2=Owner
    permissionlevel;

    constructor(_name, _description, _category, _args, _permissionlevel) {
        this.name = _name;
        this.description = _description;
        this.category = _category;
        this.args = _args;
        this.permissionlevel = _permissionlevel;
    }

    run(_msg, _args, _Bot) {
        throw new Error("Run has to be implemented!");
    }
}

module.exports = Command;