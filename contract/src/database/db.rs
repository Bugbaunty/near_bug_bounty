use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, UnorderedSet};
// use near_sdk::json_types::U128;
// use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{near_bindgen, AccountId};

use crate::user::user::User;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct BugBounty {
    pub beneficiary: AccountId,
    pub payments: UnorderedMap<AccountId, u128>,
    accounts: UnorderedMap<AccountId, UnorderedSet<String>>,
    users: LookupMap<AccountId, User>,
    // bounties: LookupMap<String, Tournament>,
    bounty_ids: UnorderedSet<String>,
    // crowd_funded_bounties: LookupMap<String, Tournament>,
    crowd_funded_bounties_ids: UnorderedSet<String>,
}

impl BugBounty {
    pub fn create_user(&mut self, user: User) {
        self.users.insert(&user.id, &user);
    }

    pub fn get_user(&self, id: AccountId) -> Option<User> {
        self.users.get(&id)
    }
    // pub fn edit_user(&mut self, )
}
