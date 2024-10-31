import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import React from "react";
import { useRouter } from "next/router";

const profileEntries = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <div className="mt-[5rem] mx-[1rem] flex flex-col w-full mb-4">
        <h1 className={`text-[1rem] text-center mb-6 mt-8`}>
          {" "}
          Update
          <span className="bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
            {" "}
            Profile
          </span>
        </h1>
        <div className="flex mt-4 mx-4 flex-col">
          <p className="text-[0.8rem] mt-4 mb-[1rem] font-semibold sm:text-base  bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
            Profile Picture
          </p>
          {/* Profile Picture Upload */}
          <div className="flex-col  flex mt-3 rounded-tr-[1.5rem] rounded-br-[1.5rem]">
            <div className="bg-black flex  cursor-pointer items-center h-[8rem] w-full lg:w-[30%] rounded-tl-full rounded-bl-full rounded-tr-[1.5rem] rounded-br-[1.5rem] ">
              <div className="flex cursor-pointer w-fit border-[4px] border-solid border-color-7 rounded-full ">
                <img
                  src={`avatar.jpg`}
                  className="rounded-full w-[7rem] h-[7rem] "
                  alt=""
                />
              </div>
              <p className="text-[0.85rem] ml-4 text-white">
                {" "}
                Upload profile picture
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-4 border border-solid border-[#2E3438] w-full" />
        <p className="text-[0.8rem] mt-4 mb-[1rem] font-semibold sm:text-base  bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
          Account Information
        </p>
        <div className="flex flex-col lg:flex-row gap-8 items-center ">
          <div className="flex flex-col w-full lg:w-[50%]">
            <p className="mb-4 text-sm sm:text-[.85rem] mt-[1.5rem] font-normal text-white">
              Username
            </p>
            <div className="w-full items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-[#fc923b]  bg-[#141414] border-solid border rounded-[6px] flex">
              <input
                className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                placeholder="Username"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-[50%]">
            <p className="mb-4 text-sm sm:text-[.85rem] mt-[1.5rem] font-normal text-white">
              Age
            </p>
            <div className="w-full items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-[#fc923b]  bg-[#141414] border-solid border rounded-[6px] flex">
              <input
                className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                placeholder="Age"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full items-center mt-10 mr-[3rem] ">
          <div className=" flex justify-between items-center mt-4">
            <p
              onClick={() => router.push("/profile")}
              className="text-color-7 hover:text-[#EA4343]  py-2 px-[.9rem] text-[0.85rem] border border-solid border-[#EA4343]/40 sm:text-sm cursor-pointer hover:bg-[#211416] rounded-lg"
            >
              Cancel
            </p>
            <p className="ml-8 text-color-7 hover:text-[#3DB569]   py-2 px-[.9rem] text-[0.85rem] border border-solid border-[#3DB569]/40 sm:text-sm cursor-pointer hover:bg-[#111E18] rounded-lg">
              Save Changes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profileEntries;
