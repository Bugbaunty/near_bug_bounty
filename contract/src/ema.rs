use crate::*;

const MAX_F64_FOR_PRECISE_MULTIPLIER: f64 = 1e30;

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct AssetEma {
    pub period_sec: DurationSec,
    #[serde(with = "u64_dec_format")]
    pub timestamp: Timestamp,
    pub price: Option<Price>,
}

impl AssetEma {
    pub fn new(period_sec: DurationSec) -> AssetEma {
        Self {
            period_sec,
            timestamp: 0,
            price: None,
        }
    }

    pub fn recompute(&mut self, median_price: Price, timestamp: Timestamp) {
        if let Some(current) = self.price.as_mut() {
            let time_diff = timestamp - self.timestamp;
            // Based on https://stackoverflow.com/questions/1023860/exponential-moving-average-sampled-at-varying-times
            let alpha =
                1.0f64 - (-2.0f64 * time_diff as f64 / to_nano(self.period_sec) as f64).exp();
            let mut current_f64 = current.multiplier.as_near() as f64;
            current_f64 *= 10f64.powi(median_price.decimals as i32 - current.decimals as i32);
            current_f64 += alpha * (median_price.multiplier.as_near() as f64 - current_f64);
            if current_f64 <= MAX_F64_FOR_PRECISE_MULTIPLIER {
                *current = Price {
                    multiplier: NearToken::from_near((current_f64 * 1e4).round() as u128),
                    decimals: median_price.decimals + 4,
                }
            } else {
                *current = Price {
                    multiplier: NearToken::from_near(current_f64.round() as u128),
                    decimals: median_price.decimals,
                }
            }
        } else {
            self.price = Some(median_price);
        }
        self.timestamp = timestamp;
    }
}
