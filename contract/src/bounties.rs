use crate::*;

macro_rules! pub_struct {
    ($name:ident {$($field:ident: $t:ty,)*}) => {
       #[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug)]
       #[serde(crate = "near_sdk::serde")]
        pub struct $name {
            $(pub(crate) $field: $t),*
        }
    }
}


pub_struct! ( BountyAccount {
     id_hash: String,
     creator: String,
     creator_id: Option<String>,
     status: BountyStatus,
     idx: u8,
     starting_date: String,
     bounty_rules: String,
     bounty_type: BountyType,
     milestone: String,
     guild:Vec<Guild>,
     guild_points: Option<Vec<(String,u128)>>,
     messages: Option<Vec<Chat>>,
     user: Vec<String>,
     winers: Vec<String>,
     entry_prize: u8,
     total_prize: u128,
     no_of_winners: u8,
     no_of_participants: u128,
     milestone_type: MilestonesType,
     end_date: String,
     title: String,
     points: Option<Vec<(String,u128)>>,
     milestones: Option<Vec<MilestonesAccount>>,
});

pub_struct! ( BuildAccount {
     id_hash: String,
     creator: String,
     creator_id: Option<String>,
     status: BountyStatus,
     idx: u8,
     starting_date: String,
     build_rules: String,
     build_type: BountyType,
     milestone: String,
     guild:Vec<Guild>,
     guild_points: Option<Vec<(String,u128)>>,
     messages: Option<Vec<Chat>>,
     user: Vec<String>,
     winers: Vec<String>,
     entry_prize: u8,
     total_prize: u128,
     no_of_winners: u8,
     no_of_participants: u128,
     milestone_type: MilestonesType,
     end_date: String,
     title: String,
     points: Option<Vec<(String,u128)>>,
     milestones: Option<Vec<MilestonesAccount>>,
});

pub_struct! ( BugAccount {
     id_hash: String,
     creator: String,
     creator_id: Option<String>,
     status: BountyStatus,
     idx: u8,
     starting_date: String,
     bug_rules: String,
     bug_type: BountyType,
     milestone: String,
     guild:Vec<Guild>,
     guild_points: Option<Vec<(String,u128)>>,
     messages: Option<Vec<Chat>>,
     user: Vec<String>,
     winers: Vec<String>,
     entry_prize: u8,
     total_prize: u128,
     no_of_winners: u8,
     no_of_participants: u128,
     milestone_type: MilestonesType,
     end_date: String,
     title: String,
     points: Option<Vec<(String,u128)>>,
     milestones: Option<Vec<MilestonesAccount>>,
});

pub_struct! (  MilestonesAccount {
     status: BountyStatus,
     milestone_status: MilestonesStatus,
     idx: u8,
     starting_date: Option<String>,
     milestone_rules: String,
     bounty_type: BountyType,
     milestone: String,
     guilds:Vec<Guild>,
     messages: Option<Vec<Chat>>,
     participants: Vec<String>,
     winers: Vec<String>,
     no_of_winners: Option<u8>,
     no_of_participants: u128,
     milestone_type: MilestonesType,
     name: Option<String>,
});

pub_struct! ( Guild {
     id_hash: String,
     captain: String,
     status: GuildType,
     name: String,
     tag: String,
     members: Vec<Member>,
     requests: Vec<String>,
     points: Option<u128>,
});

pub_struct! ( Member {
      name: String,
      principal_id: String,
});

pub_struct! ( Chat {
     name: String,
     id: String,
     time: String,
     message: String,
});

///enums
#[derive(BorshDeserialize, BorshSerialize, Default, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum MilestonesType {
    #[default]
    TeamvTeam,
    Single,
    Duo,
    Guild
}
#[derive(BorshDeserialize, BorshSerialize, Default, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum BountyStatus {
    #[default]
    AcceptingHunters,
    BountyHuntingInProgress,
    BountyHuntingCompleted,
    Archived,
}

#[derive(BorshDeserialize, BorshSerialize, Default, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum MilestonesStatus {
    #[default]
    readyToStart,
    MilestonesInProgress,
    MilestonesCompleted,
}

#[derive(BorshDeserialize, BorshSerialize, Default, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum BountyType {
    #[default]
    OpenSource,
    Reproduced,
}

#[derive(BorshDeserialize, BorshSerialize, Default, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct TokenState {
    pub bump: u8,
    pub amount: u64,
}

#[derive(BorshDeserialize, BorshSerialize, Default, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum GuildType {
    #[default]
    Open,
    Closed,
}


// beneficiary: "v1.faucet.nonofficial.testnet".parse().unwrap(),
// payments: UnorderedMap::new(b"d"),
// accounts: UnorderedMap::new(b"t"),
// bounties: LookupMap::new(b"c"),
// guilds: LookupMap::new(b"c"),
// chats: LookupMap::new(b"c"),
// builds: LookupMap::new(b"c"),
// users: LookupMap::new(b"c"),
// bounty_ids: UnorderedSet::new(b"u"),
// bugs: LookupMap::new(b"c"),

#[near_bindgen]
impl BugBounty {
    //bounties
    pub fn insert_bounty(&mut self, bounty_id: String, value: BountyAccount) {
        self.bounties.insert(&bounty_id, &value);
    }

    pub fn remove_bounty(&mut self, bounty_id: String,) {
        self.bounties.remove(&bounty_id);
    }

    pub fn get_bounty(&self, bounty_id: String) -> Option<BountyAccount> {
        self.bounties.get(&bounty_id)
    }

    pub fn does_bounty_exist(&self, bounty_id: String) -> bool {
        self.bounties.contains_key(&bounty_id)
    }


    //guilds
    pub fn insert_guild(&mut self, guild_id: String, value: Guild) {
        self.guilds.insert(&guild_id, &value);
    }

    pub fn remove_guild(&mut self, guild_id: String,) {
        self.guilds.remove(&guild_id);
    }

    pub fn get_guild(&self, guild_id: String) -> Option<Guild> {
        self.guilds.get(&guild_id)
    }

    pub fn does_guild_exist(&self, guild_id: String) -> bool {
        self.guilds.contains_key(&guild_id)
    }

    //chats
    pub fn insert_chat(&mut self, chat_id: String, value: Chat) {
        self.chats.insert(&chat_id, &value);
    }

    pub fn remove_chat(&mut self, chat_id: String,) {
        self.chats.remove(&chat_id);
    }

    pub fn get_chat(&self, chat_id: String) -> Option<Chat> {
        self.chats.get(&chat_id)
    }

    pub fn does_chat_exist(&self, chat_id: String) -> bool {
        self.chats.contains_key(&chat_id)
    }



    //bugs
    pub fn insert_bug(&mut self, bug_id: String, value: BugAccount) {
        self.bugs.insert(&bug_id, &value);
    }

    pub fn remove_bug(&mut self, bug_id: String,) {
        self.bugs.remove(&bug_id);
    }

    pub fn get_bug(&self, bug_id: String) -> Option<BugAccount> {
        self.bugs.get(&bug_id)
    }

    pub fn does_chat_bug(&self, bug_id: String) -> bool {
        self.bugs.contains_key(&bug_id)
    }

    //builds
    pub fn insert_build(&mut self, build_id: String, value: BuildAccount) {
        self.builds.insert(&build_id, &value);
    }

    pub fn remove_build(&mut self, build_id: String,) {
        self.builds.remove(&build_id);
    }

    pub fn get_build(&self, build_id: String) -> Option<BuildAccount> {
        self.builds.get(&build_id)
    }

    pub fn does_build_exist(&self, build_id: String) -> bool {
        self.builds.contains_key(&build_id)
    }
}
