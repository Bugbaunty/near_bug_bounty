use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::test_utils::accounts;
use near_sdk::AccountId;
use std::cell::RefCell;

use crate::database::db::BugBounty;

thread_local! {
    static DB: RefCell<BugBounty> = RefCell::new(BugBounty::new(accounts(0)));
}

#[derive(Debug)]
// Define a custom enum
#[derive(BorshDeserialize, BorshSerialize)]
pub enum RoleEnum {
    POSTERS,
    SOLVERS,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct User {
    pub id: AccountId,
    pub verified: bool,
    pub role: RoleEnum,
    pub username: String,
    pub job: String,
    pub location: String,
    pub skills: Vec<String>,
}

impl User {
    pub fn new(
        id: AccountId,
        username: String,
        job: String,
        role: RoleEnum,
        location: String,
        skills: Vec<String>,
    ) -> User {
        User {
            id,
            verified: false,
            role,
            username,
            job,
            location,
            skills,
        }
    }

    pub fn edit(
        id: AccountId,
        username: Option<String>,
        job: Option<String>,
        verified: Option<bool>,
        role: Option<RoleEnum>,
        location: Option<String>,
        skills: Option<Vec<String>>,
    ) -> Result<User, String> {
        DB.with(|db| {
            let db = db.borrow_mut();
            let user_exist = db.get_user(id);

            match user_exist {
                Some(mut user) => {
                    // Update fields if they are provided
                    if let Some(username_) = username {
                        user.username = username_;
                    }
                    if let Some(job_) = job {
                        user.job = job_;
                    }
                    if let Some(verified_) = verified {
                        user.verified = verified_;
                    }
                    if let Some(role_) = role {
                        user.role = role_;
                    }
                    if let Some(location_) = location {
                        user.location = location_;
                    }
                    if let Some(skills_) = skills {
                        user.skills = skills_;
                    }

                    Ok(user)
                }
                None => Err(String::from("User does not exist")),
            }
        })
    }
}
