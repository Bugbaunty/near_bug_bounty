use crate::*;

#[near]
impl BugBounty {
    #[private]
    #[init(ignore_state)]
    pub fn migrate_state() -> Self {
        env::state_read().unwrap()
    }

    /// Returns semver of this contract.
    pub fn get_version(&self) -> String {
        env!("CARGO_PKG_VERSION").to_string()
    }
}

mod upgrade {
    use near_sdk::{require, Gas};

    use super::*;
    use near_sys as sys;

    const GAS_TO_COMPLETE_UPGRADE_CALL: Gas = Gas::from_tgas(10 * 10);
    const GAS_FOR_VERIFICATION_CALL: Gas = Gas::from_tgas(10 * 5);
    const MIN_GAS_FOR_MIGRATE_STATE_CALL: Gas = Gas::from_tgas(10 * 10);

    /// Self upgrade and call migrate, optimizes gas by not loading into memory the code.
    /// Takes as input non serialized set of bytes of the code.
    #[no_mangle]
    pub extern "C" fn upgrade() {
        env::setup_panic_hook();
        let contract: BugBounty = env::state_read().expect("ERR_CONTRACT_IS_NOT_INITIALIZED");
        contract.assert_owner();
        let current_account_id = env::current_account_id().as_bytes().to_vec();
        let migrate_method_name = b"migrate_state".to_vec();
        let verification_method_name = b"get_owner_id".to_vec();
        let empty_args = b"{}".to_vec();
        unsafe {
            sys::input(0);
            let promise_id = sys::promise_batch_create(
                current_account_id.len() as _,
                current_account_id.as_ptr() as _,
            );
            sys::promise_batch_action_deploy_contract(promise_id, u64::MAX as _, 0);
            // Gas required to complete this call.
            let required_gas = env::used_gas()
                .saturating_add(GAS_TO_COMPLETE_UPGRADE_CALL)
                .saturating_add(GAS_FOR_VERIFICATION_CALL);
            require!(
                env::prepaid_gas() >= required_gas.saturating_add(MIN_GAS_FOR_MIGRATE_STATE_CALL),
                "Not enough gas to complete state migration"
            );
            let migrate_state_attached_gas = env::prepaid_gas().saturating_sub(required_gas);
            // Scheduling state migration.
            sys::promise_batch_action_function_call(
                promise_id,
                migrate_method_name.len() as _,
                migrate_method_name.as_ptr() as _,
                empty_args.len() as _,
                empty_args.as_ptr() as _,
                0 as _,
                migrate_state_attached_gas.as_gas(),
            );
            // Scheduling to return config after the migration is completed.
            sys::promise_batch_action_function_call(
                promise_id,
                verification_method_name.len() as _,
                verification_method_name.as_ptr() as _,
                empty_args.len() as _,
                empty_args.as_ptr() as _,
                0 as _,
                GAS_FOR_VERIFICATION_CALL.as_gas(),
            );
            sys::promise_return(promise_id);
        }
    }
}
