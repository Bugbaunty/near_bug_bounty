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
pub enum MilestonesType {
    #[default]
    TeamvTeam,
    Single,
    Duo,
    Guild,
}
#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub enum BountyStatus {
    #[default]
    AcceptingHunters,
    BountyHuntingInProgress,
    BountyHuntingCompleted,
    Archived,
}

#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub enum MilestonesStatus {
    #[default]
    readyToStart,
    MilestonesInProgress,
    MilestonesCompleted,
}

#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub enum BountyType {
    #[default]
    OpenSource,
    Reproduced,
}

#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub struct TokenState {
    pub bump: u8,
    pub amount: u64,
}

#[near(serializers = [json, borsh])]
#[derive(Clone, Default)]
pub enum GuildType {
    #[default]
    Open,
    Closed,
}

#[near]
impl BugBounty {}
