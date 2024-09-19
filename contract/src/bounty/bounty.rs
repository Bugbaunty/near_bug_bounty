use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::AccountId;

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Bounty {
    pub id: u32,
    pub poster: AccountId,
    pub title: String,
    pub description: String,
    pub repo_url: String,
    pub bounty_amount: u128,
    pub solved: bool,
    pub solver: Option<AccountId>,
    pub submission_url: Option<String>,
    pub created_at: u64,
    pub deadline: Option<u64>,
}

impl Bounty {
    pub fn new(
        id: u32,
        poster: AccountId,
        title: String,
        description: String,
        repo_url: String,
        bounty_amount: u128,
        created_at: u64,
        deadline: Option<u64>,
    ) -> Self {
        Bounty {
            id,
            poster,
            title,
            description,
            repo_url,
            bounty_amount,
            solved: false,
            solver: None,
            submission_url: None,
            created_at,
            deadline,
        }
    }

    pub fn mark_as_solved(&mut self, solver: AccountId, submission_url: String) {
        self.solved = true;
        self.solver = Some(solver);
        self.submission_url = Some(submission_url);
    }

    pub fn update_bounty(
        &mut self,
        title: Option<String>,
        description: Option<String>,
        deadline: Option<u64>,
    ) {
        if let Some(new_title) = title {
            self.title = new_title;
        }
        if let Some(new_description) = description {
            self.description = new_description;
        }
        if let Some(new_deadline) = deadline {
            self.deadline = Some(new_deadline);
        }
    }
}
