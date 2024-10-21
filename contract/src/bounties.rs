use crate::*;

macro_rules! pub_struct {
    ($name:ident {$($field:ident: $t:ty,)*}) => {
      #[near(serializers = [json, borsh])]
      #[derive(Clone)]
        pub struct $name {
            $(pub(crate) $field: $t),*
        }
    }
}

pub_struct! ( BountyAccount {
     id_hash: String,
     creator: String,
     creator_id: String,
     status: BountyStatus,
     idx: u8,
     bounty_requrements: String,
     bounty_type: BountyType,
     guild:Vec<Guild>,
     messages: Vec<Chat>,
     user: Vec<String>,
     winners: Vec<String>,
     total_fund: u128,
     no_of_winners: u8,
     no_of_participants: u128,
     end_date: String,
     title: String,
     description: String,
     milestones: Vec<MilestonesAccount>,
});

pub_struct! ( BuildAccount {
     id_hash: String,
     creator: String,
     creator_id: String,
     status: BountyStatus,
     idx: u8,
     build_requrements: String,
     build_type: BountyType,
     guild:Vec<Guild>,
     messages: Vec<Chat>,
     user: Vec<String>,
     winners: Vec<String>,
     total_prize: u128,
     no_of_bounty_winners: u8,
     no_of_participants: u128,
     end_date: String,
     title: String,
     description: String,
     milestones: Vec<MilestonesAccount>,
     bounties: Vec<BountyAccount>,
});


pub_struct! (  MilestonesAccount {
     status: BountyStatus,
     milestone_status: MilestonesStatus,
     idx: u8,
     claim_starting_date: String,
     claim_ending_date: String,
     milestone_requrements: String,
     milestone_description: String,
     bounty_type: BountyType,
     milestone: String,
     guilds:Vec<Guild>,
     messages: Vec<Chat>,
     participants: Vec<String>,
     winners: Vec<String>,
     no_of_winners: u8,
     no_of_participants: u128,
     name: String,
});

pub_struct! ( Guild {
     id_hash: String,
     captain: String,
     status: GuildStatus,
     name: String,
     tag: String,
     members: Vec<Member>,
     requests: Vec<String>,
     bounties_won: u128,
});

pub_struct!(Member {
    name: String,
    principal_id: String,
});

pub_struct!(Chat {
    name: String,
    id: String,
    time: String,
    message: String,
});

///enums
#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub enum BountyStatus {
    #[default]
    AcceptingHunters,
    BountyHuntingCompleted,
    Archived,
}

#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub enum MilestonesStatus {
    #[default]
    ReadyToStart,
    MilestonesInProgress,
    MilestonesCompleted,
}

#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub enum BountyType {
    #[default]
    Feature,
    Bug,
}

#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub struct TokenState {
    pub bump: u8,
    pub amount: u64,
}

#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub enum GuildStatus {
    #[default]
    Open,
    Closed,
}

#[near]
impl BugBounty {
    //bounties
    pub fn insert_bounty(&mut self, bounty_id: String, value: BountyAccount) {
        self.bounties.insert(bounty_id, value);
    }

    pub fn remove_bounty(&mut self, bounty_id: String) {
        self.bounties.remove(&bounty_id);
    }

    pub fn get_bounty(&self, bounty_id: String) -> BountyAccount {
        self.bounties[&bounty_id].clone()
    }

    pub fn does_bounty_exist(&self, bounty_id: String) -> bool {
        self.bounties.contains_key(&bounty_id)
    }

    pub fn get_all_bounties(&self, from_index: i32, limit: i32) -> Vec<(&String, &BountyAccount)> {
        self.bounties
            .iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .collect()
    }

    //guilds
    pub fn insert_guild(&mut self, guild_id: String, value: Guild) {
        self.guilds.insert(guild_id, value);
    }

    pub fn remove_guild(&mut self, guild_id: String) {
        self.guilds.remove(&guild_id);
    }

    pub fn get_guild(&self, guild_id: String) -> Guild {
        self.guilds[&guild_id].clone()
    }

    pub fn does_guild_exist(&self, guild_id: String) -> bool {
        self.guilds.contains_key(&guild_id)
    }

    pub fn get_all_guilds(&self, from_index: i32, limit: i32) -> Vec<(&String, &Guild)> {
        self.guilds
            .iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .collect()
    }

    //chats
    pub fn insert_chat(&mut self, chat_id: String, value: Chat) {
        self.chats.insert(chat_id, value);
    }

    pub fn remove_chat(&mut self, chat_id: String) {
        self.chats.remove(&chat_id);
    }

    pub fn get_chat(&self, chat_id: String) -> Chat {
        self.chats[&chat_id].clone()
    }

    pub fn does_chat_exist(&self, chat_id: String) -> bool {
        self.chats.contains_key(&chat_id)
    }
    pub fn get_all_chat(&self, from_index: i32, limit: i32) -> Vec<(&String, &Chat)> {
        self.chats
            .iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .collect()
    }


    //builds
    pub fn insert_build(&mut self, build_id: String, value: BuildAccount) {
        self.builds.insert(build_id, value);
    }

    pub fn remove_build(&mut self, build_id: String) {
        self.builds.remove(&build_id);
    }

    pub fn get_build(&self, build_id: String) -> BuildAccount {
        self.builds[&build_id].clone()
    }

    pub fn does_build_exist(&self, build_id: String) -> bool {
        self.builds.contains_key(&build_id)
    }

    pub fn get_all_builds(&self, from_index: i32, limit: i32) -> Vec<(&String, &BuildAccount)> {
        self.builds
            .iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .collect()
    }
}
