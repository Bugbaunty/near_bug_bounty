import React, { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import { useRouter } from "next/router";
import { NearContext } from "@/wallets/near";
import { useGetUser } from "@/functions";
import { useAppSelector } from "@/redux/hook";

const Profile = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [connected, setConnected] = useState<boolean>(false);
  const { wallet, signedAccountId } = React.useContext(NearContext);
  const user = useAppSelector((state) => state.profile);
  const CLIENT_ID = process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_REDIRECT_URI;
  const CLIENT_SECRET_KEY =
    process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_CLIENT_SECRET_KEY;

  const { getUser } = useGetUser();

  React.useEffect(() => {
    getUser();
  }, [signedAccountId]);

  const handleLogout = () => {
    wallet.signOut();
    router.push("/");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !token) {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET_KEY,
            code: code,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setToken(data.access_token);
          localStorage.setItem("github_access_token", data.access_token);
          setConnected(true);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [token]);

  const connectToGithub = () => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user repo`;
    window.location.href = githubAuthURL;
  };

  return (
    <div className="flex bg-n-8/90">
      <Header />
      <Sidebar />
      {user && (
        <div className=" mt-[5rem] flex flex-col w-full mb-4 ">
          <div className="flex relative bg-gradient-to-r from-linear-1/40 to bg-linear-2/30 w-full h-[10rem] rounded-t-[1.5rem] mt-4 ">
            <div className="absolute bottom-[-4rem] left-4 flex cursor-pointer border-[4px] border-solid border-color-7 rounded-full ">
              <img
                src={`avatar.jpg`}
                className="rounded-full w-[8rem] h-[8rem] "
                alt=""
              />
            </div>
            <div
              className="mt-[1rem] absolute bottom-0 right-2"
              onClick={() => router.push("/dashboard")}
            >
              <div className="flex cursor-pointer justify-center items-center hover:bg-white/80 bg-white px-3 h-fit my-2 rounded-md ">
                <p className=" my-2 text-[.85rem] text-black ">Join Bounty</p>
              </div>
            </div>
          </div>
          <div className="mx-4  sm:mx-8 flex flex-col">
            <div className="flex justify-between items-center ">
              <div className="flex flex-col mt-[4.5rem] ">
                <h3 className="text-white text-2xl font-bold">
                  {user.username}
                </h3>
                <p className=" my-2 text-sm text-color-7 ">{user.status}</p>
                <p className=" my-2 text-[1rem] text-color-7 ">
                  {user.github_link}
                </p>
              </div>
              <div className="flex mt-[-3rem] justify-center items-center gap-4  lg:mt-[1rem]">
                <div className="flex flex-col ">
                  <h3 className="flex justify-center text-white text-sm font-bold">
                    {user?.named_account_id}
                  </h3>
                  <div className="flex justify-center cursor-pointer items-center bg-[#1E1E21] px-3 h-fit my-2 rounded-full ">
                    <p
                      onClick={handleLogout}
                      className=" my-2 text-[.85rem] text-color-7 "
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* TAGS */}
            <div className="flex flex-col mt-6">
              <h3 className="flex justify-start text-white text-sm font-bold">
                Github Status
              </h3>
              <div
                onClick={() => connectToGithub()}
                className={`flex justify-center items-center  ${
                  connected ? "bg-[#111E18]" : "bg-[#211416]"
                } cursor-pointer w-fit mt-2 py-2 px-3 rounded-full `}
              >
                <p
                  className={`text-[.7rem] ${
                    connected ? "text-[#3DB569]" : "text-[#EA4343]"
                  } `}
                >
                  {connected ? "Disconnect" : "Connect"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;

//  <div className="flex flex-wrap gap-4 my-3">
//    <div className="flex justify-center items-center bg-[#111E18] p-1 rounded-md px-2">
//      <p className="text-[.7rem] text-[#3DB569]">React</p>
//    </div>
//    <div className="flex justify-center items-center bg-[#211416] p-1 rounded-md px-2">
//      <p className="text-[.7rem] text-[#EA4343]">Next Js</p>
//    </div>
//    <div className="flex justify-center items-center bg-[#102533] p-1 rounded-md px-2">
//      <p className="text-[.7rem] text-[#2497D0]">Typescript</p>
//    </div>
//    <div className="flex justify-center items-center bg-[#382612] p-1 rounded-md px-2">
//      <p className="text-[.7rem] text-[#F59E0D]">Flutter</p>
//    </div>
//    <div className="flex justify-center items-center bg-[#1E1E21] p-1 rounded-md px-2">
//      <p className="text-[.7rem] text-[#A1A1AA]">Dart</p>
//    </div>
//    <div className="flex justify-center items-center bg-[#262747] p-1 rounded-md px-2">
//      <p className="text-[.7rem] text-[#818CF8]">Redux</p>
//    </div>
//  </div>;
