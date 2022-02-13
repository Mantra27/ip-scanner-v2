const ping = require("./windows"); //for windows
const ping = require("./osx"); //for mac-os

ping("1.1.1.1", "1.1.1.2");
