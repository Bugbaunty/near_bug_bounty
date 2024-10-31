pub use crate::asset::*;
use crate::bounties::*;
pub use crate::ema::*;
use crate::legacy::*;
pub use crate::oracle::*;
use crate::token_transfer::*;
pub use crate::utils::*;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::store::{IterableMap, IterableSet, LookupSet, Vector};
use near_sdk::{
    assert_one_yocto, env, ext_contract, log, near, near_bindgen, AccountId, BorshStorageKey,
    Duration, Gas, NearToken, PanicOnDefault, Promise, Timestamp,
};
// use near_sdk_sim::types::Balance;
mod asset;
mod bounties;
mod ema;
mod legacy;
mod oracle;
mod owner;
mod token_transfer;
mod upgrade;
mod utils;

const NO_DEPOSIT: NearToken = NearToken::from_near(1);

const GAS_FOR_PROMISE: Gas = Gas::from_gas(10 * 10);

const NEAR_CLAIM_DURATION: Duration = 24 * 60 * 60 * 10u64.pow(9);
// This is a safety margin in NEAR for to cover potential extra storage.
const SAFETY_MARGIN_NEAR_CLAIM: NearToken = NearToken::from_near(1);

pub type DurationSec = u32;

#[near(serializers = [json, borsh])]
#[derive(Clone, BorshStorageKey)]
enum StorageKey {
    Oracles,
    Assets,
}

#[near(serializers = [json, borsh])]
pub struct PriceData {
    #[serde(with = "u64_dec_format")]
    pub timestamp: Timestamp,
    pub recency_duration_sec: DurationSec,

    pub prices: Vec<AssetOptionalPrice>,
}

#[ext_contract(ext_price_receiver)]
pub trait ExtPriceReceiver {
    fn oracle_on_call(&mut self, sender_id: AccountId, data: PriceData, msg: String);
}
#[near]
#[derive(BorshStorageKey)]
pub enum Prefix {
    Root,
    Vector,
    LookupSet,
    IterableSet,
    LookupMap,
    IterableMap,
    Nested(String),
}

#[near(contract_state)]

pub struct BugBounty {
    pub beneficiary: AccountId,
    pub payments: IterableMap<AccountId, NearToken>,
    accounts: IterableMap<AccountId, IterableSet<String>>,
    users: IterableMap<AccountId, User>,
    bounties: IterableMap<String, BountyAccount>,
    guilds: IterableMap<String, Guild>,
    chats: IterableMap<String, Chat>,
    builds: IterableMap<String, BuildAccount>,
    bugs: IterableMap<String, BugAccount>,
    bounty_ids: IterableSet<String>,
    pub oracles: IterableMap<AccountId, VOracle>,

    pub assets: IterableMap<AssetId, VAsset>,

    pub recency_duration_sec: DurationSec,

    pub owner_id: AccountId,

    pub near_claim_amount: NearToken,
}
#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct User {
    pub id_hash: String,
    pub dob: String,
    pub date: String,
    pub status: Status,
    pub bounties_created: u8,
    pub bounties_won: u128,
    pub username: String,
    pub is_mod: bool,
    pub named_account_id: AccountId,
    pub secret_account_key: String,
    pub smart_contract_id: String,
    pub guild_badge: String,
    pub github_link: String,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub enum Status {
    Online,
    Offline,
}

impl Default for BugBounty {
    fn default() -> Self {
        Self {
            beneficiary: "v1.faucet.nonofficial.testnet".parse().unwrap(),
            payments: IterableMap::new(Prefix::IterableMap),
            accounts: IterableMap::new(Prefix::IterableMap),
            bounties: IterableMap::new(Prefix::IterableMap),
            guilds: IterableMap::new(Prefix::IterableMap),
            chats: IterableMap::new(Prefix::IterableMap),
            builds: IterableMap::new(Prefix::IterableMap),
            users: IterableMap::new(Prefix::IterableMap),
            bounty_ids: IterableSet::new(Prefix::IterableSet),
            bugs: IterableMap::new(Prefix::IterableSet),
            oracles: IterableMap::new(StorageKey::Oracles),
            assets: IterableMap::new(StorageKey::Assets),
            recency_duration_sec: 0,
            owner_id: "v1.faucet.nonofficial.testnet".parse().unwrap(),
            near_claim_amount: NearToken::from_near(0),
        }
    }
}

#[near]
impl BugBounty {
    #[init]
    pub fn new(
        recency_duration_sec: DurationSec,
        owner_id: AccountId,
        near_claim_amount: U128,
    ) -> Self {
        Self {
            beneficiary: "v1.faucet.nonofficial.testnet".parse().unwrap(),
            payments: IterableMap::new(Prefix::IterableMap),
            accounts: IterableMap::new(Prefix::IterableMap),
            bounties: IterableMap::new(Prefix::IterableMap),
            guilds: IterableMap::new(Prefix::IterableMap),
            chats: IterableMap::new(Prefix::IterableMap),
            builds: IterableMap::new(Prefix::IterableMap),
            users: IterableMap::new(Prefix::IterableMap),
            bounty_ids: IterableSet::new(Prefix::IterableSet),
            bugs: IterableMap::new(Prefix::IterableMap),
            oracles: IterableMap::new(StorageKey::Oracles),
            assets: IterableMap::new(StorageKey::Assets),
            recency_duration_sec,
            owner_id,
            near_claim_amount: NearToken::from_near(u128::from(near_claim_amount)),
        }
    }

    // Public - beneficiary getter
    pub fn get_beneficiary(&self) -> AccountId {
        self.beneficiary.clone()
    }

    pub fn create_user(
        &mut self,
        account_id: AccountId,
        username: String,
        dob: String,
        github_link: String,
        image_url: String,
        id_hash: String,
    ) {
        self.users.insert(
            account_id.clone(),
            User {
                id_hash,
                dob,
                date: "".to_string(),
                status: Status::Online,
                bounties_created: 0,
                bounties_won: 0,
                username: username.to_string(),
                is_mod: false,
                named_account_id: account_id,
                secret_account_key: "".to_string(),
                smart_contract_id: "".to_string(),
                guild_badge: "".to_string(),
                github_link,
            },
        );
    }

    pub fn remove_user(&mut self, account_id: AccountId) {
        self.users.remove(&account_id);
    }

    pub fn get_user(&self, account_id: AccountId) -> Option<&User> {
        self.users.get(&account_id)
    }

    pub fn is_user_present(&self, account_id: AccountId) -> bool {
        self.users.contains_key(&account_id)
    }

    pub fn get_all_user(&self, from_index: i32, limit: i32) -> Vec<(&AccountId, &User)> {
        self.users
            .iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .collect()
    }

    // Public - but only callable by env::current_account_id(). Sets the beneficiary
    #[private]
    pub fn change_beneficiary(&mut self, beneficiary: AccountId) {
        self.beneficiary = beneficiary;
    }

    // pub fn get_all_users(&self) -> IterableMap<AccountId, User> {
    //     self.users.clone()
    // }

    /// Remove price data from removed oracle.
    pub fn clean_oracle_data(&mut self, account_id: AccountId, asset_ids: Vec<AssetId>) {
        assert!(self.internal_get_oracle(&account_id).is_none());
        for asset_id in asset_ids {
            let mut asset = self.internal_get_asset(&asset_id).expect("Unknown asset");
            if asset.remove_report(&account_id) {
                self.internal_set_asset(&asset_id, asset);
            }
        }
    }

    pub fn get_oracle(&self, account_id: AccountId) -> Option<Oracle> {
        self.internal_get_oracle(&account_id)
    }

    pub fn get_oracles(
        &self,
        from_index: Option<u64>,
        limit: Option<u64>,
    ) -> Vec<(AccountId, Oracle)> {
        self.oracles
            .iter()
            .skip(from_index.unwrap() as usize)
            .take(limit.unwrap() as usize)
            .map(|payload| (payload.0.to_owned(), Oracle::from(payload.1.to_owned())))
            .collect()
    }

    pub fn get_assets(&self, from_index: Option<u64>, limit: Option<u64>) -> Vec<(AssetId, Asset)> {
        self.assets
            .iter()
            .skip(from_index.unwrap() as usize)
            .take(limit.unwrap() as usize)
            .map(|payload| (payload.0.to_owned(), Asset::from(payload.1.to_owned())))
            .collect()
    }

    pub fn get_asset(&self, asset_id: AssetId) -> Option<Asset> {
        self.internal_get_asset(&asset_id)
    }

    pub fn get_price_data(&self, asset_ids: Option<Vec<AssetId>>) -> PriceData {
        let mut temp_unwrapped_asset_ids: Vec<AssetId> = vec![];
        let mut unwrapped_asset_ids: Vec<AssetId> = vec![];
        for x in self.assets.keys() {
            temp_unwrapped_asset_ids.push(x.to_owned())
        }
        unwrapped_asset_ids = asset_ids.unwrap_or_else(|| temp_unwrapped_asset_ids);
        let timestamp = env::block_timestamp();
        let timestamp_cut = timestamp.saturating_sub(to_nano(self.recency_duration_sec));
        let min_num_recent_reports = std::cmp::max(1, (self.oracles.len() + 1) / 2) as usize;

        PriceData {
            timestamp,
            recency_duration_sec: self.recency_duration_sec,
            prices: unwrapped_asset_ids
                .into_iter()
                .map(|asset_id| {
                    // EMA for a specific asset, e.g. wrap.near#3600 is 1 hour EMA for wrap.near
                    if let Some((base_asset_id, period_sec)) = asset_id.split_once('#') {
                        let period_sec: DurationSec =
                            period_sec.parse().expect("Failed to parse EMA period");
                        let asset = self.internal_get_asset(&base_asset_id.to_string());
                        AssetOptionalPrice {
                            asset_id,
                            price: asset.and_then(|asset| {
                                asset
                                    .emas
                                    .into_iter()
                                    .find(|ema| ema.period_sec == period_sec)
                                    .filter(|ema| ema.timestamp >= timestamp_cut)
                                    .and_then(|ema| ema.price)
                            }),
                        }
                    } else {
                        let asset = self.internal_get_asset(&asset_id);
                        AssetOptionalPrice {
                            asset_id,
                            price: asset.and_then(|asset| {
                                asset.median_price(timestamp_cut, min_num_recent_reports)
                            }),
                        }
                    }
                })
                .collect(),
        }
    }

    /// Returns price data for a given oracle ID and given list of asset IDs.
    /// If recency_duration_sec is given, then it uses the given duration instead of the one from
    /// the contract config.
    pub fn get_oracle_price_data(
        &self,
        account_id: AccountId,
        asset_ids: Option<Vec<AssetId>>,
        recency_duration_sec: Option<DurationSec>,
    ) -> PriceData {
        let mut temp_unwrapped_asset_ids: Vec<AssetId> = vec![];
        let mut unwrapped_asset_ids: Vec<AssetId> = vec![];
        for x in self.assets.keys() {
            temp_unwrapped_asset_ids.push(x.to_owned())
        }
        unwrapped_asset_ids = asset_ids.unwrap_or_else(|| temp_unwrapped_asset_ids);

        let timestamp = env::block_timestamp();
        let recency_duration_sec = recency_duration_sec.unwrap_or(self.recency_duration_sec);
        let timestamp_cut = timestamp.saturating_sub(to_nano(recency_duration_sec));

        let oracle_id: AccountId = account_id.into();
        PriceData {
            timestamp,
            recency_duration_sec,
            prices: unwrapped_asset_ids
                .into_iter()
                .map(|asset_id| {
                    let asset = self.internal_get_asset(&asset_id);
                    AssetOptionalPrice {
                        asset_id,
                        price: asset.and_then(|asset| {
                            asset
                                .reports
                                .into_iter()
                                .find(|report| report.oracle_id == oracle_id)
                                .filter(|report| report.timestamp >= timestamp_cut)
                                .map(|report| report.price)
                        }),
                    }
                })
                .collect(),
        }
    }

    pub fn report_prices(&mut self, prices: Vec<AssetPrice>, claim_near: Option<bool>) {
        assert!(!prices.is_empty());
        let oracle_id = env::predecessor_account_id();
        let timestamp = env::block_timestamp();

        // Oracle stats
        let mut oracle = self.internal_get_oracle(&oracle_id).expect("Not an oracle");
        oracle.last_report = timestamp;
        oracle.price_reports += prices.len() as u64;

        if claim_near.unwrap_or(false) && oracle.last_near_claim + NEAR_CLAIM_DURATION <= timestamp
        {
            let liquid_balance = env::account_balance()
                .saturating_add(env::account_locked_balance())
                .saturating_sub(env::storage_byte_cost())
                .saturating_mul(u128::from(env::storage_usage()));
            if liquid_balance
                > self
                    .near_claim_amount
                    .saturating_add(SAFETY_MARGIN_NEAR_CLAIM)
            {
                oracle.last_near_claim = timestamp;
                Promise::new(oracle_id.clone()).transfer(self.near_claim_amount);
            }
        }

        self.internal_set_oracle(&oracle_id, oracle);

        // Updating prices
        for AssetPrice { asset_id, price } in prices {
            price.assert_valid();
            if let Some(mut asset) = self.internal_get_asset(&asset_id) {
                asset.remove_report(&oracle_id);
                asset.add_report(Report {
                    oracle_id: oracle_id.clone(),
                    timestamp,
                    price,
                });
                if !asset.emas.is_empty() {
                    let timestamp_cut =
                        timestamp.saturating_sub(to_nano(self.recency_duration_sec));
                    let min_num_recent_reports =
                        std::cmp::max(1, (self.oracles.len() + 1) / 2) as usize;
                    if let Some(median_price) =
                        asset.median_price(timestamp_cut, min_num_recent_reports)
                    {
                        for ema in asset.emas.iter_mut() {
                            ema.recompute(median_price.clone(), timestamp);
                        }
                    }
                }
                self.internal_set_asset(&asset_id, asset);
            } else {
                log!("Warning! Unknown asset ID: {}", asset_id);
            }
        }
    }

    #[payable]
    pub fn oracle_call(
        &mut self,
        receiver_id: AccountId,
        asset_ids: Option<Vec<AssetId>>,
        msg: String,
    ) -> Promise {
        self.assert_well_paid();

        let sender_id = env::predecessor_account_id();
        let price_data = self.get_price_data(asset_ids);
        // let remaining_gas = env::prepaid_gas() - env::used_gas();
        // assert!(remaining_gas >= GAS_FOR_PROMISE);

        let ext_self = ext_price_receiver::ext(sender_id.clone());
        ext_price_receiver::ExtPriceReceiverExt::oracle_on_call(
            ext_self, sender_id, price_data,
            msg,
            // receiver_id,
            // NO_DEPOSIT,
            // remaining_gas - GAS_FOR_PROMISE,
        )
    }

    pub fn assert_well_paid(&self) {
        assert_one_yocto();
    }
}

mod tests {
    use super::*;

    #[test]
    fn get_default_greeting() {
        let contract = BugBounty::default();
        // this test did not call set_greeting so should return the default "Hello" greeting
        assert_eq!(contract.get_greeting(), "Hello");
    }

    #[test]
    fn set_then_get_greeting() {
        let mut contract = BugBounty::default();
        contract.set_greeting("howdy".to_string());
        assert_eq!(contract.get_greeting(), "howdy");
    }
}
