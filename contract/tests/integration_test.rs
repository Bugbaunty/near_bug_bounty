// extern crate contract;
// use contract::BugBounty;
// use near_sdk::test_utils::accounts;

// #[test]
// fn test_bug_bounty_workflow() {
//     let beneficiary = accounts(0);
//     let mut bug_bounty = BugBounty::new(beneficiary.clone());

//     // Add more tests for methods that modify the state of BugBounty
//     // Check that the beneficiary is set correctly
//     assert_eq!(bug_bounty.get_beneficiary(), &beneficiary);

//     // Ensure the UnorderedMaps and UnorderedSets are initialized empty
//     assert!(bug_bounty.payments.is_empty());
//     assert!(bug_bounty.accounts.is_empty());
//     assert!(bug_bounty.bounty_ids.is_empty());
// }

// // #[test]
// // fn test_create_user() {
// //     let beneficiary = accounts(0);
// //     let mut bug_bounty = BugBounty::new(beneficiary.clone());

// //     // Add more tests for methods that modify the state of BugBounty
// //     // Check that the beneficiary is set correctly
// //     assert_eq!(bug_bounty.get_beneficiary(), &beneficiary);

// //     // Ensure the UnorderedMaps and UnorderedSets are initialized empty
// //     assert!(bug_bounty.payments.is_empty());
// //     assert!(bug_bounty.accounts.is_empty());
// //     assert!(bug_bounty.bounty_ids.is_empty());
// // }
