const mysql = require("mysql");


class MySQLink {
    host;
    user;
    password;
    database;
    multipleStatements;

    con;

    constructor(_host, _user, _password, _database) {
        this.host = _host;
        this.user = _user;
        this.password = _password;
        this.database = _database;
        this.multipleStatements = true;

        this.con = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            multipleStatements: this.multipleStatements
        });
    }
}

exports.MySQLink = MySQLink;