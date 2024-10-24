use crate::bounties::*;
use crate::token_transfer::*;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::{U128, U64};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::store::{IterableMap, IterableSet, LookupSet, Vector};
use near_sdk::BorshStorageKey;
use near_sdk::Promise;
use near_sdk::{env, near, require, AccountId, Gas, NearToken, PanicOnDefault};

mod bounties;
mod token_transfer;

#[near]
#[derive(BorshStorageKey)]
pub enum Prefix {
    Root,
    Vector,
    LookupSet,
    IterableSet,
    LookupMap,
    IterableMap,
    Nested(String),
}

#[near(contract_state)]
pub struct BugBounty {
    pub beneficiary: AccountId,
    pub payments: IterableMap<AccountId, NearToken>,
    accounts: IterableMap<AccountId, IterableSet<String>>,
    users: IterableMap<AccountId, User>,
    bounties: IterableMap<String, bounties::BountyAccount>,
    guilds: IterableMap<String, bounties::Guild>,
    chats: IterableMap<String, bounties::Chat>,
    builds: IterableMap<String, bounties::BuildAccount>,
    bounty_ids: IterableSet<String>,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct User {
    pub id_hash: String,
    pub age: u8,
    pub date: String,
    pub status: Status,
    pub bounties_created: u8,
    pub bounties_won: u128,
    pub username: String,
    pub is_mod: bool,
    pub named_account_id: String,
    pub secret_account_key: String,
    pub smart_contract_id: String,
    pub guild_badge: String,
    pub github_link: String,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub enum Status {
    Online,
    Offline,
}

impl Default for BugBounty {
    fn default() -> Self {
        Self {
            beneficiary: "v1.faucet.nonofficial.testnet".parse().unwrap(),
            payments: IterableMap::new(Prefix::IterableMap),
            accounts: IterableMap::new(Prefix::IterableMap),
            bounties: IterableMap::new(Prefix::IterableMap),
            guilds: IterableMap::new(Prefix::IterableMap),
            chats: IterableMap::new(Prefix::IterableMap),
            builds: IterableMap::new(Prefix::IterableMap),
            users: IterableMap::new(Prefix::IterableMap),
            bounty_ids: IterableSet::new(Prefix::IterableSet),
        }
    }
}

#[near]
impl BugBounty {
    #[init]
    pub fn new() -> Self {
        Self {
            beneficiary: "v1.faucet.nonofficial.testnet".parse().unwrap(),
            payments: IterableMap::new(Prefix::IterableMap),
            accounts: IterableMap::new(Prefix::IterableMap),
            bounties: IterableMap::new(Prefix::IterableMap),
            guilds: IterableMap::new(Prefix::IterableMap),
            chats: IterableMap::new(Prefix::IterableMap),
            builds: IterableMap::new(Prefix::IterableMap),
            users: IterableMap::new(Prefix::IterableMap),
            bounty_ids: IterableSet::new(Prefix::IterableSet),
        }
    }

    // Public - beneficiary getter
    pub fn get_beneficiary(&self) -> AccountId {
        self.beneficiary.clone()
    }

    pub fn create_user(&mut self, account_id: AccountId, user: User) {
        self.users.insert(account_id, user);
    }

    pub fn remove_user(&mut self, account_id: AccountId) {
        self.users.remove(&account_id);
    }

    pub fn get_user(&self, account_id: AccountId) -> Option<&User> {
        self.users.get(&account_id)
    }

    pub fn is_user_present(&self, account_id: AccountId) -> bool {
        self.users.contains_key(&account_id)
    }

    // Public - but only callable by env::current_account_id(). Sets the beneficiary
    #[private]
    pub fn change_beneficiary(&mut self, beneficiary: AccountId) {
        self.beneficiary = beneficiary;
    }

    // pub fn get_all_users(&self) -> IterableMap<AccountId, User> {
    //     self.users.clone()
    // }
}
