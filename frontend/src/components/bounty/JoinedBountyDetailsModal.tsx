import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FcClock } from "react-icons/fc";
import dayjs from "dayjs";
import { NearContext } from "@/wallets/near";
import { BugBountyContract } from "@/config";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hook";
import { serializeError } from "@/utils/SerializeError";

const JoinedBountyDetailsModal = ({ isOpen, onClose, bounty }) => {
  // if (!isOpen) return null;

  const { wallet, signedAccountId } = useContext(NearContext);
  const [loading, setLoading] = useState(false);
  const formattedStartDate = dayjs(Number(bounty.start_date)).format(
    "MMM D, YYYY"
  );
  const profile = useAppSelector((state) => state.profile);
  const router = useRouter();

  const handleJoin = async () => {
    try {
      if (signedAccountId) {
        if (bounty.creator === profile.username) {
          toast.error("you can't join a bounty you created");
          return;
        }
        setLoading(true);
        const join = await wallet.callMethod({
          contract: BugBountyContract,
          method: "join_bounty",
          args: {
            user_id: signedAccountId,
            bounty_id: bounty.id_hash,
          },
        });

        toast.success("Joined Successfully!");
        router.push("/profile");
      }
    } catch (err) {
      const readable = serializeError(err);
      console.log(err);
      toast.error(readable);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] p-8 rounded-lg w-11/12 md:w-3/5 lg:w-2/5 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {bounty.creator} - {bounty.title}
          </h2>
          <IoClose className="text-2xl cursor-pointer" onClick={onClose} />
        </div>
        <div className="mb-4 text-[1rem] text-color-7">
          <p>Price: ${bounty.total_fund.toLocaleString()}</p>
          <p>Participants: {bounty.no_of_participants || 0}</p>
          <p>Start Date: {formattedStartDate}</p>
          <p>Status: {bounty.status || "Ongoing"}</p>
        </div>
        <div className="flex flex-row items-center mb-4">
          <FcClock className="text-color-7 w-6 h-6" />
          <p className="ml-4 text-sm">
            {dayjs(bounty.end_date).diff(dayjs(), "day")} days left
          </p>
        </div>
        <div
          className="text-sm text-white space-y-4"
          dangerouslySetInnerHTML={{ __html: bounty.description }}
        />
        <button
          onClick={handleJoin}
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-linear-1 to-linear-2 text-white py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          {loading ? "submitting" : "Submit Completion"}
        </button>
      </div>
    </div>
  );
};

export default JoinedBountyDetailsModal;
