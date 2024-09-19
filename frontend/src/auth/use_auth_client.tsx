import React, { useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import {
  canisterId,
  createActor,
  bug_bounty_backend,
} from "../../../declarations/bug_bounty_backend";
// import { canisterId as iiCanId } from "../../../declarations/internet_identity";
import { _SERVICE } from "../../../declarations/bug_bounty_backend/bug_bounty_backend.did";
import { ActorSubclass } from "@dfinity/agent";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  loginII: any;
  loginNFID: any;
  logout: any;
  authClient: any;
  identity: any;
  principal: any;
  whoamiActor: ActorSubclass<_SERVICE> | null;
}>({
  isAuthenticated: false,
  loginII: null,
  loginNFID: null,
  logout: null,
  authClient: null,
  identity: null,
  principal: null,
  whoamiActor: null,
});

const network = process.env.DFX_NETWORK || "local";
const APPLICATION_NAME = "BugBounty";
const APPLICATION_LOGO_URL = "https://i.postimg.cc/zBMQpTJn/Asset-51.png";
const iiCanId = "http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943";

//127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai

const AUTH_PATH =
  "/authenticate/?applicationName=" +
  APPLICATION_NAME +
  "&applicationLogo=" +
  APPLICATION_LOGO_URL +
  "#authorize";

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider: network === "ic" ? "https://identity.ic0.app" : iiCanId,
  },
  loginNFID: {
    identityProvider:
      network === "ic"
        ? "https://nfid.one" + AUTH_PATH
        : "https://nfid.one" + AUTH_PATH,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<_SERVICE>>();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, []);

  const loginII = async () => {
    console.log("II url", iiCanId);
    await authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
        navigate("/dashboard");
      },
    });
  };

  const loginNFID = async () => {
    await authClient.login({
      ...options.loginNFID,
      onSuccess: () => {
        updateClient(authClient);
        navigate("/dashboard");
      },
    });
  };

  const updateClient = async (client: any) => {
    try {
      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      const identity = client.getIdentity();
      setIdentity(identity);
      // console.log("identity", identity)
      const principal = identity.getPrincipal();

      setPrincipal(principal);
      // console.log("Principal", principal)
      setAuthClient(client);

      const actor = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      });
      setWhoamiActor(actor);
    } catch (err) {
      console.log("Error on auth:", err);
      // navigate("/dashboard");
    }
  };

  async function logout() {
    await authClient?.logout();
    await updateClient(authClient);
    setIsAuthenticated(false);
    setIdentity(null);
  }

  return {
    logout,
    loginII,
    identity,
    principal,
    loginNFID,
    authClient,
    whoamiActor,
    isAuthenticated,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
