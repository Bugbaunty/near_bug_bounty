import React, { useState } from "react";
import { GlareCard } from "../ui/glare-card";
import { IoBug } from "react-icons/io5";
import { FcClock } from "react-icons/fc";
import dayjs from "dayjs";
import BountyDetailsModal from "./BountyDetailsModal";
import CreatedBountyDetailsModal from "./CreatedBountyDetailsModal";
import JoinedBountyDetailsModal from "./JoinedBountyDetailsModal";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";

const BountyCard = ({ bounty }) => {
  const user = useAppSelector((state) => state.profile);
  const router = useRouter();
  const pathname = router.pathname;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false);
  const [isJoinedModalOpen, setIsJoinedModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const openCreatedModal = () => setIsCreatedModalOpen(true);
  const openJoinedModal = () => setIsJoinedModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  const closeCreatedModal = () => setIsCreatedModalOpen(false);
  const closeJoinedModal = () => setIsJoinedModalOpen(false);

  const handleOnClick = () => {
    if (user.username === bounty.creator) {
      closeModal();
      closeJoinedModal();
      openCreatedModal();
    } else if (
      user.username != bounty.creator &&
      pathname.includes("/dashboard")
    ) {
      openModal();
      closeCreatedModal();
      closeJoinedModal();
    } else {
      openJoinedModal();
      closeModal();
      closeCreatedModal();
    }
  };

  return (
    <>
      <div onClick={handleOnClick}>
        <GlareCard className="flex flex-col p-8">
          <div className="flex flex-row items-center ">
            <div className="flex justify-center items-center p-2 bg-white/10 rounded-[12px]  w-fit">
              <IoBug className=" text-color-7 w-6 h-6" />
            </div>
            <p className=" ml-4 text-[1rem] text-white font-bold">
              {bounty.title}
            </p>
          </div>
          <div className="flex flex-col mt-4">
            <p className=" text-[1rem] text-color-7">Price</p>
            <p className="mt-2 bg-gradient-to-r text-[1.5rem]  from-linear-1 to-linear-2 bg-clip-text text-[transparent]">
              ${bounty.total_fund.toLocaleString()}{" "}
            </p>
            <div className="mt-8">
              <div className="flex flex-row items-center ">
                <FcClock className="text-color-7 w-6 h-6" />
                <p className="ml-4 text-sm text-white ">
                  {dayjs(bounty.end_date as string).diff(dayjs(), "day")}days
                  left
                </p>
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
              <h3 className="mt-4">{bounty.description.slice(3, 200)}...</h3>
            </div>
          </div>
        </GlareCard>
      </div>
      <BountyDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        bounty={bounty}
      />
      <CreatedBountyDetailsModal
        isOpen={isCreatedModalOpen}
        onClose={closeCreatedModal}
        bounty={bounty}
      />
      <JoinedBountyDetailsModal
        isOpen={isJoinedModalOpen}
        onClose={closeJoinedModal}
        bounty={bounty}
      />
    </>
  );
};

export default BountyCard;
