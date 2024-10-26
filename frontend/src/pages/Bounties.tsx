import React, { useEffect } from "react";
import BountyCard from "../components/bounty/BountyCard";
import { useGetAllBounties } from "@/functions";
import { useAppSelector } from "@/redux/hook";

const Bounties = () => {
  const { getBounties } = useGetAllBounties();
  const bounties = useAppSelector((state) => state.bounties);
  console.log("REDUX BOUNTIES", bounties);

  useEffect(() => {
    getBounties();
  }, []);
  return (
    <div className="mx-4  sm:mx-8 mt-[5rem] flex flex-col w-full mb-4">
      <h2 className="text-white text-xl mt-4">Bounties</h2>
      <p className=" mt-2 text-sm text-color-7 max-w-3xl  mb-6 lg:mb-8">
        Explore different bug bounties
      </p>
      <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
      </div>
    </div>
  );
};

export default Bounties;
