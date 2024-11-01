import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import RepoCard from "./RepoCard";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  connected: boolean;
  connectToGithub: any;
  githubProfileData: any;
  handleDisconnect: any;
  connecting: boolean;
  disconnecting: boolean;
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

const GithubProfile = ({
  connected,
  connectToGithub,
  githubProfileData,
  handleDisconnect,
  connecting,
  disconnecting,
}: Props) => {
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="">
      {connected === false ? (
        <div className="flex w-full justify-center items-center h-full">
          <div
            onClick={() => connectToGithub()}
            className={`flex cursor-pointer justify-center items-center ${
              connecting ? "bg-black" : "hover:bg-white bg-white/95"
            }  px-3 h-fit my-2 rounded-md`}
          >
            {connecting ? (
              <ClipLoader
                color={color}
                loading={connecting}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <FaGithub className="text-black" />
            )}
            <p
              className={`my-2  ml-2 text-[.85rem] ${
                connecting ? "text-white" : " text-black"
              } `}
            >
              Connect to Github
            </p>
          </div>
        </div>
      ) : (
        <div className="flex mt-1 flex-col">
          <div className="flex justify-between items-center my-2">
            <p className="text-[0.8rem] mt-4 mb-[1rem] font-semibold sm:text-base  bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
              My Repositories
            </p>
            <div
              onClick={() => handleDisconnect()}
              className="flex justify-center cursor-pointer items-center bg-[#211416] hover:bg-[#2f1c1f] px-3 h-fit my-2 rounded-full"
            >
              {disconnecting ? (
                <ClipLoader
                  color={color}
                  loading={disconnecting}
                  cssOverride={override}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <></>
              )}
              <p className="my-2 ml-2 text-[.85rem] text-[#EA4343]">
                Disconnect Github
              </p>
            </div>
          </div>
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
