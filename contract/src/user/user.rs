use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::AccountId;

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
    verfied: bool,
    role: RoleEnum,
    username: String,
    job: String,
    location: String,
    skills: Vec<String>,
}

impl User {
    pub fn new(
        &mut self,
        id: AccountId,
        username: String,
        job: String,
        role: RoleEnum,
        location: String,
        skills: Vec<String>,
    ) -> User {
        User {
            id,
            verfied: false,
            role,
            username,
            job,
            location,
            skills,
        }
    }

    //    pub fn edit(&mut self,id:AccountId, username:Option<String>,  job:Option<String>,  role:Option<RoleEnum>,location: Option<String>, skills :Option<String>) {
    //     self.id = id;
    //     self.username = S
    //    }
}

// pub fn user() {
//     println!("user")
// }
