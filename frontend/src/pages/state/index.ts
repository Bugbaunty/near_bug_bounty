const { writeFile } = require("fs");
const { connect, KeyPair, keyStores, utils } = require("near-api-js");
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const path = require("path");
const homedir = require("os").homedir();
const reader = require('xlsx');
const { startLookupMap } = require("./maps/lookup_map");
const { startTreeMap } = require("./maps/tree_map");
const { startUnorderedMap } = require("./maps/unordered_map");
const { startLookupSet } = require("./sets/lookup_set");
const { startUnorderedSet } = require("./sets/unordered_set");
const { startVectorSet } = require("./sets/vector");

// Reading our test file

let CONTRACT_ID = process.env.CONTRACT_NAME;
let NUM_ITERS = 100;

let NETWORK_ID = "testnet";
let near;
let config;
let keyStore;

export interface UserProfileState {
   id_hash: string,
   age: number,
   date: string,
   status: Status,
   bounties_created: number,
   bounties_won: number,
   username: string,
   is_mod: boolean,
   named_account_id: string,
   secret_account_key: string,
   smart_contract_id: string,
   guild_badge: string,
   github_link: string,
}

enum Status {
  Online,
  Offline,
}


const profileData: UserProfileState = {
  id_hash: "String",
  age: 0,
  date: "String",
  bounties_created: 0,
  bounties_won: 0,
  username: "string",
  is_mod: false,
  named_account_id: "string",
  secret_account_key: "string",
  smart_contract_id: "string",
  guild_badge: "string",
  github_link: "string",
  status: Status.Online,
}


async function create_user(accountId, contractAccount, contractId, iters) {
  console.log("Starting Unordered Map Insertions")
    try {
      const res = await contractAccount.functionCall({
        contractId,
        methodName: 'create_user',
        args: {
          'account_id': accountId,
          "user": JSON.stringify(profileData)
        },
        gas: "300000000000000"
      });

      let buff = new Buffer(res.status.SuccessValue, 'base64');
      let text = buff.toString('utf8');
      let parsed = JSON.parse(text)

      console.log(parsed.gas);
      console.log(parsed.storage);
      console.log(parsed);
    } catch(e) {
      console.log('error adding to user to database: ', e);
    }
    console.log(`Finished`)
}

async function get_user(accountId, contractAccount, contractId, iters) {
    try {
      const res = await contractAccount.functionCall({
        contractId,
        methodName: 'get_user',
        args: {
          'key': accountId,
        },
        gas: "300000000000000"
      });

      let buff = new Buffer(res.status.SuccessValue, 'base64');
      let text = buff.toString('utf8');
      let parsed = JSON.parse(text)

      console.log(parsed.gas);
      console.log(parsed.storage);
      console.log(parsed);
    } catch(e) {
      console.log('error getting user from database: ', e);
    }
    console.log(`Finished`);
}

const initiateNear = async () => {
    const CREDENTIALS_DIR = ".near-credentials";

    const credentialsPath = (await path).join(homedir, CREDENTIALS_DIR);
    (await path).join;
    keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

    config = {
        networkId: NETWORK_ID,
        keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };

    near = await connect(config);
};

async function start() {

    //deployed linkdrop proxy contract
    await initiateNear();

    if(!CONTRACT_ID) {
        throw "must specify proxy contract ID";
    }

    const contractAccount = await near.account(CONTRACT_ID);

    console.log(`initializing contract for account ${CONTRACT_ID}`);
    try {
        await contractAccount.functionCall({
            contractId: CONTRACT_ID,
            methodName: 'new',
            args: {},
            gas: "300000000000000"
        });
    } catch(e) {
        console.log('error initializing contract: ', e);
    }

    const accountId = `benjiman.testnet`;

    console.log("Done");

}


start();



// Export it to make it available outside
module.exports.get_user = get_user;
module.exports.create_user = create_user;