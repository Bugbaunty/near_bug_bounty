use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, UnorderedSet};
// use near_sdk::json_types::U128;
// use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{near_bindgen, AccountId};

use crate::bounty::bounty::Bounty;
use crate::user::user::User;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct BugBounty {
    pub beneficiary: AccountId,
    pub payments: UnorderedMap<AccountId, u128>,
    accounts: UnorderedMap<AccountId, UnorderedSet<String>>,
    users: LookupMap<AccountId, User>,
    bounties: LookupMap<String, Bounty>,
    bounty_ids: UnorderedSet<String>,
    // crowd_funded_bounties: LookupMap<String, Tournament>,
    crowd_funded_bounties_ids: UnorderedSet<String>,
}

impl BugBounty {
    pub fn new(beneficiary: AccountId) -> Self {
        BugBounty {
            beneficiary,
            payments: UnorderedMap::new(b"p".to_vec()),
            accounts: UnorderedMap::new(b"a".to_vec()),
            users: LookupMap::new(b"u".to_vec()),
            bounties: LookupMap::new(b"i".to_vec()),
            bounty_ids: UnorderedSet::new(b"b".to_vec()),
            crowd_funded_bounties_ids: UnorderedSet::new(b"c".to_vec()),
        }
    }

    pub fn create_user(&mut self, user: User) {
        self.users.insert(&user.id, &user);
    }

    pub fn get_user(&self, id: AccountId) -> Option<User> {
        self.users.get(&id)
    }
    pub fn get_beneficiary(&self) -> &AccountId {
        &self.beneficiary
    }

    pub fn edit_user(&mut self, user: User) {
        let old_data_ = self.get_user(user.id.clone());
        match old_data_ {
            Some(mut old_data) => {
                old_data.username = user.username;
                old_data.job = user.job;
                old_data.verified = user.verified;
                old_data.role = user.role;
                old_data.location = user.location;
                old_data.skills = user.skills;

                self.users.insert(&user.id, &old_data);
            }
            None => todo!(),
        }
    }
}

// #[cfg(test)]
// mod tests {
//     use super::*;
//     use near_sdk::test_utils::accounts;

//     #[test]
//     fn test_new_bug_bounty() {
//         let beneficiary = accounts(0);
//         let bug_bounty = BugBounty::new(beneficiary.clone());

//         // Check that the beneficiary is set correctly
//         assert_eq!(bug_bounty.get_beneficiary(), &beneficiary);

//         // Ensure the UnorderedMaps and UnorderedSets are initialized empty
//         assert!(bug_bounty.payments.is_empty());
//         assert!(bug_bounty.accounts.is_empty());
//         assert!(bug_bounty.bounty_ids.is_empty());
//     }
// }
