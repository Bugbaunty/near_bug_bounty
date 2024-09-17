import React, {useState, useEffect} from "react";
import TournamentDetails from "../Features/TournamentData";
import { ITournamentData, tournamentContextType } from "../@types/tournament";

const UserContext = React.createContext<tournamentContextType | null>(null);

const UserProvider: React.FC<React.ReactNode> = ({ children }: any) => {
const account = localStorage.getItem('near_app_wallet_auth_key') === null ? "Username" : localStorage.getItem('near_app_wallet_auth_key');
  const [userName, setUserName] = useState("");
  const [tournamentData , setToutnamentData] = useState<ITournamentData[]>(TournamentDetails)

  let accountJSON

  useEffect(() => {
    if (account === "Username") {
      setUserName("Username")
    } else {
      accountJSON = JSON.parse(account!);
      const accountID = accountJSON.accountId;
      setUserName(accountID.substring(0, accountID.length - 8));
    }
  }, [userName])

    return (
        <UserContext.Provider value={{tournamentData , userName}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };