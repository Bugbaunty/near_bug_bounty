import { useAppSelector } from "@/redux/hook";
import React, { useState } from "react";
import BountyCard from "../bounty/BountyCard";
import nodataimg from "../../assets/bug-fixed.png";
import Image from "next/image";
import { useRouter } from "next/router";

const MyBounties = () => {
  const router = useRouter();
  const createdBounties = useAppSelector((state) => state.createdBounty);
  const joinedBounties = useAppSelector((state) => state.joinedBounty);
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div className="">
      <div className="flex gap-8">
        <div
          onClick={() => setActiveTab("1")}
          className="flex justify-center cursor-pointer items-center bg-[#1E1E21] hover:bg-[#34343b] px-3 h-fit my-2 rounded-full"
        >
          <p className="my-2  text-[.85rem] text-[#A1A1AA]">Created Bounties</p>
        </div>
        <div
          onClick={() => setActiveTab("2")}
          className="flex justify-center cursor-pointer items-center bg-[#1E1E21] hover:bg-[#34343b] px-3 h-fit my-2 rounded-full"
        >
          <p className="my-2  text-[.85rem] text-[#A1A1AA]">Joined Bounties</p>
        </div>
      </div>
      {activeTab === "1" ? (
        <div>
          <p className="text-[0.8rem] mt-4 ml-4 mb-[1rem] font-semibold sm:text-base  bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
            My Bounties
          </p>
          {createdBounties.length == 0 ? (
            <div className="w-full flex flex-col justify-center items-center">
              <Image className="w-fit h-fit" src={nodataimg} alt="" />
              <p className="mt-4 mb-2 text-center text-[.85rem] text-color-7">
                {" "}
                No Bounty created{" "}
              </p>
              <div
                onClick={() => router.push("/create-bounty")}
                className="flex justify-center mt-2 cursor-pointer items-center bg-[#1E1E21] hover:bg-[#34343b] px-3 h-fit my-2 rounded-full"
              >
                <p className="my-2   text-[.85rem] text-[#A1A1AA]">
                  Create One
                </p>
              </div>
            </div>
          ) : (
            <div className=" mx-4  sm:mx-8   grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {createdBounties?.map((bounty) => (
                <BountyCard key={bounty.id_hash} bounty={bounty} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-[0.8rem] mt-4 ml-4 mb-[1rem] font-semibold sm:text-base  bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text"></p>
          {joinedBounties.length == 0 ? (
            <div className="w-full flex flex-col justify-center items-center">
              <Image className="w-fit h-fit" src={nodataimg} alt="" />
              <p className=" mt-4 mb-2 text-center text-[.85rem] text-color-7">
                {" "}
                No Bounty Joined{" "}
              </p>
              <div
                onClick={() => router.push("/dashboard")}
                className="flex justify-center mt-2 cursor-pointer items-center bg-[#1E1E21] hover:bg-[#34343b] px-3 h-fit my-2 rounded-full"
              >
                <p className="my-2  text-[.85rem] text-[#A1A1AA]">Join One</p>
              </div>
            </div>
          ) : (
            <div className=" mx-4  sm:mx-8   grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {joinedBounties?.map((bounty) => (
                <BountyCard key={bounty.id_hash} bounty={bounty} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBounties;
