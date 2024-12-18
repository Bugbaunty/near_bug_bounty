import React, { useState, useContext, useRef } from "react";
import { NearContext } from "@/wallets/near";
import { BugBountyContract } from "@/config";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { BountyAccount, User } from "@/redux/types";
import { addProfile } from "@/redux/slice/ProfileSlice";
import { addBounty, clearBounties } from "@/redux/slice/BountiesSlice";
import { addCreatedBounty, clearCreatedBounties } from "@/redux/slice/CreatedBountySlice";

export const useInitializeContract = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const initContract = async () => {
    try {
      setLoading(true);
      const newAcc = await wallet.callMethod({
        contractId: BugBountyContract,
        method: "new",
        args: {},
      });
      if (newAcc) {
        console.log(newAcc);
        toast.success("Initialized Account Successfully");
        return;
      }
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { initContract, loading };
};

export const useIsUserExist = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const [userExist, setUserExist] = useState(false);
  const router = useRouter();

  const isUserExist = async () => {
    try {
      setLoading(true);
      const user = await wallet.viewMethod({
        contractId: BugBountyContract,
        method: "is_user_present",
        args: { account_id: signedAccountId.toString() },
      });

      setUserExist(user);
      console.log("user", user);

      if (user) {
        router.push("/profile");
      } else {
        // await wallet.callMethod({
        //   contractId: BugBountyContract,
        //   method: "new",
        //   args: {},
        // });
        router.push("/create-profile");
      }

      return;
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { isUserExist, loading, userExist };
};

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const createUser = async (user: any) => {
    const sendVal = {
      account_id: signedAccountId,
      user,
    };
    const jsonString = JSON.stringify(sendVal);
    try {
      setLoading(true);
      const data = await wallet.callMethod({
        contractId: BugBountyContract,
        method: "create_user",
        args: {
          account_id: signedAccountId,
          username: user.username,
          age: user.age,
          // user: JSON.stringify(user),
          //   user: new Map(Object.entries(user)),
        },
      });
      if (data) {
        console.log("DATA", data);
        return;
      }
    } catch (err) {
      console.log("ERROR", err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { createUser, loading };
};

export const useGetUser = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const isInitialLoad = useRef(true);

  const getUser = async () => {
    try {
      if (signedAccountId) {
        setLoading(true);
        const data: User = await wallet.viewMethod({
          contractId: BugBountyContract,
          method: "get_user",
          args: { account_id: signedAccountId },
        });
        if (data) {
          dispatch(addProfile(data));
          return;
        }
      }
    } catch (err) {
      console.log("ERROR", err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { getUser, loading };
};

export const useGetAllBounties = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false); // Tracks if getBounties has already been called

  const getBounties = async () => {
    if (hasFetched.current) return; // Prevent multiple calls
    hasFetched.current = true; // Mark as fetched
    try {
      setLoading(true);
      const data = await wallet.viewMethod({
        contractId: BugBountyContract,
        method: "get_all_bounties",
        args: { from_index: 0, limit: 2 },
      });

      console.log("FROM ACC", data);
      if (data) {
        dispatch(clearBounties())
        for (let i = 0; i < data.length; i++) {
          console.log(data[i][1]);
          dispatch(addBounty(data[i][1]));
        }
      }
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  return { getBounties, loading };
};

export const useGetJoinedBounties = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false); // Tracks if getBounties has already been called

  const getJoinedBounties = async () => {
    if (hasFetched.current) return; // Prevent multiple calls
    hasFetched.current = true; // Mark as fetched
    try {
      setLoading(true);
      const data = await wallet.viewMethod({
        contractId: BugBountyContract,
        method: "get_all_bounties",
        args: { from_index: 0, limit: 2 },
      });

      console.log("FROM ACC", data);
      if (data) {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i][1]);
          // if (data[i][1].)
          dispatch(addBounty(data[i][1]));
        }
      }
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  return { getJoinedBounties, loading };
};

export const useGetCreatedBounties = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const hasFetchedCreated = useRef(false); // Tracks if getBounties has already been called
  const profile = useAppSelector((state) => state.profile);

  const getCreatedBounties = async () => {
    try {
      if (profile) {
        if (hasFetchedCreated.current) return;
        hasFetchedCreated.current = true;
        setLoading(true);
        const data = await wallet.viewMethod({
          contractId: BugBountyContract,
          method: "get_all_bounties",
          args: { from_index: 0, limit: 30 },
        });

        console.log("FROM ACC", data);
        if (data) {
          dispatch(clearCreatedBounties())
          for (let i = 0; i < data.length; i++) {
            if (profile.username === data[i][1].creator) {
              dispatch(addCreatedBounty(data[i][1]));
            }
          }
        }
      }
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  return { getCreatedBounties, loading };
};
