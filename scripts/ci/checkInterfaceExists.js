const fs = require("fs");
const path = require("path");
const argv = process.argv.slice(2);

if (argv.length !== 1) {
  throw Error(`Require 1 arguments, passed: ${argv.length}`);
}

const dir = argv[0];

if (fs.existsSync(path.join(__dirname, "..", "..", dir, "interface"))) {
  console.log("true");
} else {
  console.log("false");
}
