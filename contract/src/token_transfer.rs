use crate::*;
use near_sdk::{env, log, Promise};

pub const STORAGE_COST: NearToken = NearToken::from_millinear(1);

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Payment {
    pub account_id: AccountId,
    pub total_amount: U128,
}

#[near]
impl BugBounty {
    #[payable]
    pub fn donate(&mut self) -> String {
        // Get who is calling the method and how much NEAR they attached
        let donor: AccountId = env::predecessor_account_id();
        let payment_amount = env::attached_deposit();

        require!(
            payment_amount > STORAGE_COST,
            format!(
                "Attach at least {} yoctoNEAR to cover for the storage cost",
                STORAGE_COST
            )
        );

        let mut donated_so_far: NearToken = self
            .payments
            .get(&donor)
            .cloned()
            .unwrap_or(NearToken::from_near(0));

        let to_transfer = if donated_so_far.is_zero() {
            // This is the user's first payment, lets register it, which increases storage
            // Subtract the storage cost to the amount to transfer
            payment_amount.saturating_sub(STORAGE_COST).to_owned()
        } else {
            payment_amount
        };

        // Persist in storage the amount donated so far
        donated_so_far = donated_so_far.saturating_add(payment_amount);

        self.payments.insert(donor.clone(), donated_so_far);

        log!(
            "Thank you {} for donating {}! You donated a total of {}",
            donor.clone(),
            payment_amount,
            donated_so_far
        );

        // Send the NEAR to the beneficiary
        Promise::new(self.beneficiary.clone()).transfer(to_transfer);

        // Return the total amount donated so far
        donated_so_far.to_string()
    }

    pub fn get_payment_for_account(&self, account_id: AccountId) -> Payment {
        let amount = self
            .payments
            .get(&account_id)
            .cloned()
            .unwrap_or(NearToken::from_near(0))
            .as_yoctonear();

        Payment {
            account_id: account_id.clone(),
            total_amount: U128::from(amount),
        }
    }

    // Public Method - get total number of donors
    pub fn number_of_donors(&self) -> U64 {
        U64::from(self.payments.len() as u64)
    }

    // Public Method - paginate through all payments on the contract
    pub fn get_payments(&self, from_index: Option<u32>, limit: Option<u32>) -> Vec<Payment> {
        // where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
        let start = from_index.unwrap_or(0);

        self.payments
            .into_iter()
            .skip(start as usize)
            .take(limit.unwrap_or(10) as usize)
            .map(|(account_id, total_amount)| Payment {
                account_id: account_id.clone(),
                total_amount: U128::from(total_amount.as_yoctonear()),
            })
            .collect()
    }
}
