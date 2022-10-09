const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { abi, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "suit journey opinion foil access boss sketch stadium random fence repeat dismiss",
  "https://rinkeby.infura.io/v3/d554970d906e482494a0dcdb1aa3819d"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const [account] = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", account);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: account });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
