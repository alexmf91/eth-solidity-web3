const path = require("path");
const fs = require("fs");
const solc = require("solc");
const fsExtra = require("fs-extra");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");
const buildPath = path.resolve(__dirname, "build");

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

/**
 * Writes the contracts from the compiled sources into JSON files, which you will later be able to
 * use in combination with web3.
 * @param compiled - Object containing the compiled contracts.
 * @param buildPath - Path of the build folder.
 */
function writeOutput(compiled, buildPath) {
  fsExtra.ensureDirSync(buildPath);

  for (let contractFileName in compiled.contracts) {
    console.log("contractFileName", contractFileName);
    const contractName = contractFileName.replace(".sol", "");
    const pathResolved = path.resolve(buildPath, contractName + ".json");
    console.log("pathResolved: ", pathResolved);
    console.log("Writing: ", contractName + ".json");
    fsExtra.outputJsonSync(pathResolved, compiled.contracts[contractFileName].basic);
  }
}


compilesFiles = JSON.parse(solc.compile(JSON.stringify(input)));

writeOutput(compilesFiles, buildPath);
