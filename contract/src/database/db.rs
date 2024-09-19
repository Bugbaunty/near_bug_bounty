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
    bounties: LookupMap<u32, Bounty>,
    bounty_ids: UnorderedSet<String>,
    // crowd_funded_bounties: LookupMap<String, Tournament>,
    crowd_funded_bounties_ids: UnorderedSet<String>,
}

impl BugBounty {
    //--------------------USER----------------------//
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

    //--------------------BOUNTY----------------------//

    pub fn create_bounty(&mut self, bounty: Bounty) {
        self.bounties.insert(&bounty.id, &bounty);
    }

    pub fn get_bounty(&mut self, id: u32) -> Option<Bounty> {
        self.bounties.get(&id)
    }

    pub fn get_bounties_by_account(&mut self, account_id: AccountId) {
        let mut result = Vec::new();

        for (_, bounty) in self.bounties.iter() {
            if bounty.poster == account_id || bounty.solver == Some(account_id.clone()) {
                result.push(bounty);
            }
        }
        result
    }

    pub fn update_bounty(&mut self, id: u32, title: String, description: String, deadline: String) {
        let bounty = self.get_bounty(id.clone());
        match bounty {
            Some(data) => {

                //TODO
                // call Bounty::update_bounty

                // data.title = title;
                // data.description = description;
                // data.deadline = deadline;

                // self.bounties.insert(&id, &data);
            }
            None => todo!(),
        }
    }
}
