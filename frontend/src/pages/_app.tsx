import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { Wallet, NearContext } from "@/wallets/near";
import { NetworkId, BugBountyContract } from "@/config";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import store from "@/redux/store";

const wallet = new Wallet({
  networkId: NetworkId,
  createAccessKeyFor: BugBountyContract,
});

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
    Cookies.set(
      "isAuthenticated",
      signedAccountId.length > 5 ? "true" : "false"
    );
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Provider store={store}>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: `1px solid #AC6AFF`,
              padding: "16px",
              color: "#AC6AFF",
              backgroundColor: "#FFC876",
              borderRadius: "8px",
              fontFamily: "Arial, sans-serif",
            },
          }}
        />
        <Component {...pageProps} />
        <ProgressBar
          height="4px"
          color="#2497D0"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Provider>
    </NearContext.Provider>
  );
}
