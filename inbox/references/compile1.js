// reference: https://ethereum.stackexchange.com/questions/125616/how-to-complie-smart-contract-in-node-js-solc-version-0-8-13
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const builtPath = path.resolve(__dirname, "build");
//remove file in build module
fs.removeSync(builtPath);
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
//read  content present in file
console.log(inboxPath);
const source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

//compile contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

//create build folder
fs.ensureDirSync(builtPath);
console.log(output);

for (let contract in output.contracts["Inbox.sol"]) {
  fs.outputJsonSync(
    path.resolve(__dirname, "build", contract + ".json"),
    output.contracts["Inbox.sol"][contract].evm
  );
}
