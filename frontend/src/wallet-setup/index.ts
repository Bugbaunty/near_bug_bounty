import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

export const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupMyNearWallet()],
});

export const modal = setupModal(selector, {
  contractId: "test.testnet",
});

// modal.show();
