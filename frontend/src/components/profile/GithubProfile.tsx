import React from "react";
import { FaGithub } from "react-icons/fa";
import RepoCard from "./RepoCard";

interface Props {
  connected: boolean;
  connectToGithub: any;
  githubProfileData: any;
}

const GithubProfile = ({
  connected,
  connectToGithub,
  githubProfileData,
}: Props) => {
  //   console.log("Data", githubProfileData);
  return (
    <div className="">
      {connected === false ? (
        <div className="flex w-full justify-center items-center h-full">
          <div
            onClick={() => connectToGithub()}
            className="flex cursor-pointer justify-center items-center hover:bg-white bg-white/95 px-3 h-fit my-2 rounded-md"
          >
            <FaGithub className="text-black" />{" "}
            <p className="my-2  ml-2 text-[.85rem] text-black">
              Connect to Github
            </p>
          </div>
        </div>
      ) : (
        <div className="flex mt-1 flex-col">
          <p className="text-[0.8rem] mt-4 mb-[1rem] font-semibold sm:text-base  bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
            My Repositories
          </p>
          <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {githubProfileData?.map((repo: any) => (
              <RepoCard key={repo?.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubProfile;
