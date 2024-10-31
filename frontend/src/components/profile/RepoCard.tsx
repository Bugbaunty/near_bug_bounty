import React from "react";
import { GlareCard } from "../ui/glare-card";
import { VscRepoClone } from "react-icons/vsc";
import Image from "next/image";

interface Props {
  repo: any;
}

const RepoCard = ({ repo }: Props) => {
  return (
    <div>
      <GlareCard className="flex flex-col p-8">
        <div className="flex flex-row items-center ">
          <div className="flex justify-center items-center p-2 bg-white/10 rounded-[12px]  w-fit">
            <VscRepoClone className=" text-color-7 w-6 h-6" />
          </div>
          <div className="flex flex-wrap items-center">
            <p className=" ml-4 text-[.7rem] text-white font-bold">
              {repo?.name}
            </p>
            <div className="flex ml-4 justify-center items-center bg-[#1E1E21] p-1 rounded-md px-2">
              <p className="text-[.7rem] text-[#A1A1AA]">{repo?.visibility}</p>
            </div>
          </div>
        </div>
        <div className="flex-col mt-4">
          <div className="flex items-center">
            <p className=" text-[.7rem] text-color-7">Owner</p>
            <div className="flex ml-4">
              <div className="relative  flex cursor-pointer border-[1px] border-solid rounded-full">
                <img
                  src={repo?.owner?.avatar_url}
                  className="rounded-full w-[1rem] h-[1rem]"
                  alt=""
                />
              </div>
              <p className=" ml-1  bg-gradient-to-r text-[.7rem]  from-linear-1 to-linear-2 bg-clip-text text-[transparent]">
                {repo?.owner?.login}
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-col  mt-4">
            {repo.language === "" ? (
              <></>
            ) : (
              <div className="flex justify-center items-center bg-[#262747] w-fit p-1 rounded-md px-2">
                <p className="text-[.7rem] text-[#818CF8]">{repo.language}</p>
              </div>
            )}
            <p className="text-sm sm:text-[.85rem] mt-3 font-normal text-color-7">
              {repo.description}
            </p>
          </div>
        </div>
      </GlareCard>
    </div>
  );
};

export default RepoCard;
