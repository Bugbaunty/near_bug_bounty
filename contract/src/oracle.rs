use crate::*;

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Oracle {
    #[serde(with = "u64_dec_format")]
    pub last_report: Timestamp,
    pub price_reports: u64,

    #[serde(with = "u64_dec_format")]
    pub last_near_claim: Timestamp,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct OracleV0 {
    #[serde(with = "u64_dec_format")]
    pub last_report: Timestamp,
    pub price_reports: u64,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub enum VOracle {
    V0(OracleV0),
    Current(Oracle),
}

impl From<VOracle> for Oracle {
    fn from(v: VOracle) -> Self {
        match v {
            VOracle::V0(o) => Oracle {
                last_report: o.last_report,
                price_reports: o.price_reports,
                last_near_claim: 0,
            },
            VOracle::Current(c) => c,
        }
    }
}

impl From<Oracle> for VOracle {
    fn from(c: Oracle) -> Self {
        VOracle::Current(c)
    }
}

impl Oracle {
    pub fn new() -> Self {
        Self {
            last_report: 0,
            price_reports: 0,
            last_near_claim: 0,
        }
    }
}

impl BugBounty {
    pub fn internal_get_oracle(&self, account_id: &AccountId) -> Option<Oracle> {
        self.oracles
            .get(account_id)
            .map(|o| Oracle::from(o.clone()))
    }

    pub fn internal_set_oracle(&mut self, account_id: &AccountId, oracle: Oracle) {
        self.oracles.insert(account_id.clone(), oracle.into());
    }
}
