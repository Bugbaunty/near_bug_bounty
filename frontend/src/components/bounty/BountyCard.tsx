import React from "react";
import { GlareCard } from "../ui/glare-card";
import { IoBug } from "react-icons/io5";
import { FcClock } from "react-icons/fc";

const BountyCard = () => {
  return (
    <GlareCard className="flex flex-col p-8">
      <div className="flex flex-row items-center ">
        <div className="flex justify-center items-center p-2 bg-white/10 rounded-[12px]  w-fit">
          <IoBug className=" text-color-7 w-6 h-6" />
        </div>
        <p className=" ml-4 text-[1rem] text-white font-bold">Deonorla</p>
      </div>
      <div className="flex flex-col mt-4">
        <p className=" text-[1rem] text-color-7">Price</p>
        <p className="mt-2 bg-gradient-to-r text-[1.5rem]  from-linear-1 to-linear-2 bg-clip-text text-[transparent]">
          $5000{" "}
        </p>
        <div className="mt-8">
          <div className="flex flex-row items-center ">
            <FcClock className="text-color-7 w-6 h-6" />
            <p className="ml-4 text-sm text-white ">10 days left</p>
          </div>
          {/* TAGS */}
          <div className="flex flex-wrap gap-4 my-3">
            <div className="flex justify-center items-center bg-[#111E18] p-1 rounded-md px-2">
              <p className="text-[.7rem] text-[#3DB569]">Smart Contract</p>
            </div>
            <div className="flex justify-center items-center bg-[#211416] p-1 rounded-md px-2">
              <p className="text-[.7rem] text-[#EA4343]">Bug Bounty</p>
            </div>
            <div className="flex justify-center items-center bg-[#102533] p-1 rounded-md px-2">
              <p className="text-[.7rem] text-[#2497D0]">Crypto</p>
            </div>
          </div>
          <h3 className="mt-4">
            Verify testnest smart contracts with white paper calculation
          </h3>
        </div>
      </div>
    </GlareCard>
  );
};

export default BountyCard;
