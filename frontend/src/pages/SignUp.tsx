import React from "react";
import bounty from "../assets/bounty.jpg";
import Heading from "../components/design/Heading";
import { useAuth } from "../auth/use_auth_client";
const SignUp = () => {
  const { loginII, loginNFID } = useAuth();

  return (
    <div className="">
      <div className="relative flex justify-center items-center ">
        <img
          className="w-full h-screen object-cover md:object-left opacity-5"
          src={bounty}
          alt="bounty "
        />
      </div>
      <div className="absolute  m-auto flex  flex-col inset-0 w-[90%] md:w-[70%] lg:w-[50%]  p-4 z-1  h-[39rem] mb-5  border border-n-1/10 rounded-3xl  xl:h-[46rem]">
        <h1 className={` text-[1.5rem] mb-6  text-center mt-32`}>
          {" "}
          Login to
          <span className="bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
            {" "}
            Bug Bounty
          </span>
        </h1>
        <p className=" mt-2 text-sm text-color-7 max-w-3xl mx-auto mb-6 lg:mb-8">
          Revolutionize the way you debug code
        </p>
        <div className="mt-8">
          <button
            onClick={() => {
              loginII();
            }}
            className="justify-center  w-full px-6 text-[.6rem] sm:text-base text-color-7  mt-[0.8rem] sm:mt-[1.5rem] flex border border-n-1/10 hover:border-n-1/30      rounded-[9999px] items-center cursor-pointer py-3"
          >
            <img src={`Icp.svg`} alt="" className="m-0 w-[.75rem] sm:w-6" />
            <p className="text-[0.65rem] ml-4  font-bold sm:text-[.85rem]">
              Sign in with Internet Identity
            </p>
          </button>
          <button
            onClick={() => {
              loginNFID();
            }}
            className="justify-center  w-full px-6 text-[.6rem] sm:text-base text-color-7  mt-[0.8rem] sm:mt-[1.5rem] flex border border-n-1/10 hover:border-n-1/30   rounded-[9999px] items-center cursor-pointer py-3"
          >
            <img
              src={`nfid.svg`}
              alt=""
              className="m-0 w-[2.5rem] sm:w-[3rem]"
            />
            <p className="text-[0.65rem] ml-4  font-bold sm:text-[.85rem]">
              Sign in with NFID
            </p>
          </button>
          <div className="mt-8">
            <p className="text-[.7rem] lg:text-[.82rem] text-center text-color-7 my-[.2rem]">
              Do not have an account ?{"    "}
              <span
                onClick={() => {
                  loginNFID();
                }}
                className="bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text hover:underline cursor-pointer lg:text-[.82rem] text-[.7rem]"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
