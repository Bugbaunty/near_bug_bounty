import { useAppSelector } from "@/redux/hook";
import React from "react";
import BountyCard from "../bounty/BountyCard";

const MyBounties = () => {
  const createdBounties = useAppSelector((state) => state.createdBounty);
  const joinedBounties = useAppSelector((state) => state.joinedBounty);
  return (
    <div className="">
      <div className="my-4 mx-4  sm:mx-8 mt-[5rem] ">Created Bounties</div>
      <div className=" mx-4  sm:mx-8   grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {createdBounties?.map((bounty) => (
          <BountyCard key={bounty.id_hash} bounty={bounty} />
        ))}
      </div>

      <div className="my-4 mx-4  sm:mx-8 mt-[5rem] ">Joined Bounties</div>
      <div className=" mx-4  sm:mx-8   grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {joinedBounties?.map((bounty) => (
          <BountyCard key={bounty.id_hash} bounty={bounty} />
        ))}
      </div>
    </div>
  );
};

export default MyBounties;
