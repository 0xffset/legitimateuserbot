const fs = require("fs");

module.exports = function processEntry(_path) {
    if (_path.endsWith(".js")) {
        return _path.substring(_path.indexOf("/") + 1);
    } else {
        return fs.readdirSync(_path).map(entry => {
            if (entry.indexOf(".") === -1)
                return processEntry(`${_path}/${entry}`);
            else if (entry.endsWith(".js"))
                return `${_path.substring(_path.indexOf("/") + 1)}/${entry}`;
        }).flat();
    }
}