/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from 'near-api-js';
import React from 'react';



export class GameBloc {

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse
  }

  async new_tournament(userID, tournamentID, gameName, users, prize) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: "new_tournament",  args: {owner_id: userID, tournament_id_hash: tournamentID, game_name: gameName, no_of_users_input: users, prize_input: prize }  })
  }

   async getAllTournaments() {
    return await this.wallet.callMethod({ contractId: this.contractId, method: "get_all_tournaments", args: { }})
   }

     async initializeContract(userID) {
        return await this.wallet.callMethod({ contractId: this.contractId, method: "new",  args: {owner_id: JSON.parse(userID).accountId }  })
       }

     async joinTournament(userID, id) {
        return await this.wallet.callMethod({ contractId: this.contractId, method: "join_tournament", args: {user_id: userID, tournament_id: id }})
       }


}

