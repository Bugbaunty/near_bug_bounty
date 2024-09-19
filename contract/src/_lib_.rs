// use near_sdk::test_utils::accounts;
// use near_sdk::AccountId;
// use std::cell::RefCell;
//
// pub use crate::database::db::BugBounty;
// use crate::user::user::{RoleEnum, User};
// use crate::bounty::*;
// use crate::token_transfer::*;
// use crate::user::*;
//
// mod bounty;
// pub mod database;
// mod user;
//
// thread_local! {
//     static DB: RefCell<BugBounty> = RefCell::new(BugBounty::new(accounts(0)));
// }
//
// pub fn create_user(
//     id: AccountId,
//     username: String,
//     job: String,
//     role: RoleEnum,
//     location: String,
//     skills: Vec<String>,
// ) -> Result<(), String> {
//     let user = User::new(id, username, job, role, location, skills);
//     DB.with(|db| {
//         let mut db = db.borrow_mut();
//         let new_user = db.create_user(user);
//         Ok(new_user)
//     })
// }
//
// pub fn get_user(id: AccountId) -> Result<Option<User>, String> {
//     DB.with(|db| {
//         let db = db.borrow_mut();
//         let user = db.get_user(id);
//         Ok(user)
//     })
// }
//
// pub fn edit_user(
//     id: AccountId,
//     username: Option<String>,
//     job: Option<String>,
//     verified: Option<bool>,
//     role: Option<RoleEnum>,
//     location: Option<String>,
//     skills: Option<Vec<String>>,
// ) {
//     let user = User::edit(id, username, job, verified, role, location, skills);
//     match user {
//         Ok(user) => DB.with(|db| {
//             let mut db = db.borrow_mut();
//             db.edit_user(user)
//         }),
//         _ => {
//             // Handle the error, for example by returning it
//             // Err()
//         }
//     }
// }
