import React, { useEffect, useState } from "react";
import BountyCard from "@/components/bounty/BountyCard";
import { useRouter } from "next/router";
import { useGetAllBounties, useGetUser } from "@/functions";
import { useAppSelector } from "@/redux/hook";
import { NearContext } from "@/wallets/near";

const Bounties = () => {
  const router = useRouter();
  const { wallet, signedAccountId } = React.useContext(NearContext);

  const bounties = useAppSelector((state) => state.bounties);
  const { getUser } = useGetUser();

  const { getBounties, loading } = useGetAllBounties();
  useEffect(() => {
    getBounties();
  }, []);

  React.useEffect(() => {
    getUser();
  }, [signedAccountId]);

  return (
    <div className="mx-4  sm:mx-8 mt-[5rem]  flex flex-col w-full mb-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-white text-xl mt-4">Bounties</h2>
          <p className=" mt-2 text-sm text-color-7 max-w-3xl  mb-6 lg:mb-8">
            Explore different bug bounties
          </p>
        </div>
        <div className="mr-4  " onClick={() => router.push("/create-bounty")}>
          <div className="flex cursor-pointer justify-center items-center hover:bg-white/80 bg-white px-3 h-fit my-2 rounded-md ">
            <p className="my-2 text-[.85rem] text-black cursor-pointer">
              Create Bounty
            </p>
          </div>
        </div>
      </div>
      {loading && <h1>fetching bounties...</h1>}
      <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {bounties?.map((bounty) => (
          <BountyCard key={bounty.id_hash} bounty={bounty} />
        ))}
      </div>
    </div>
  );
};

export default Bounties;
