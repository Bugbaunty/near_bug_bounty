use crate::*;

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct AssetV0 {
    pub reports: Vec<Report>,
}

impl From<AssetV0> for Asset {
    fn from(v: AssetV0) -> Self {
        Asset {
            reports: v.reports,
            emas: vec![],
        }
    }
}
