const argv = process.argv.slice(2);

if (argv.length !== 3) {
  throw Error(`Require 3 arguments, passed: ${argv.length}`);
}

const langAlias = {
  assemblyscript: "as",
  rust: "rs"
}

const str = argv[0];
const lang = langAlias[argv[1]];
const idx = argv[2];

const arr = str.split(",");
arr[1] = `${arr[1]}.${lang}.demos.wraplib.eth`

console.log(arr[parseInt(idx)]);
