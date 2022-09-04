const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    Inbox: {
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

const { contracts } = JSON.parse(solc.compile(JSON.stringify(input)));
const { abi, evm } = contracts.Inbox.Inbox;
const bytecode = evm.bytecode.object;

module.exports = {
  abi,
  bytecode
};
