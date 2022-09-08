const fs = require("fs");
const path = require("path");
const argv = process.argv.slice(2);

if (argv.length !== 2) {
  throw Error(`Require 2 arguments, passed: ${argv.length}`);
}

const dir = argv[0];
const language = argv[1];

if (language !== "interface" || fs.existsSync(path.join(__dirname, "..", "..", dir, "interface"))) {
  console.log("true");
} else {
  console.log("false");
}
