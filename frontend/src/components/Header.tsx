import React, { useEffect, useState, useContext } from "react";
import { navigation, sign_in } from "../constants/index";
import { useRouter } from "next/router";
import Button from "./utils/Button";
import MenuSvg from "@/assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { BugBountyContract } from "@/config";
import { useIsUserExist, useGetUser } from "@/functions";

import { NearContext } from "@/wallets/near";

const Header = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [openNavigation, setOpenNavigation] = useState<boolean>(false);
  const { isUserExist, userExist, loading } = useIsUserExist();
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const { signedAccountId, wallet } = useContext(NearContext);
  const [label, setLabel] = useState("Loading...");
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loginBtnClicked, setLoginBtnClicked] = useState(false);

  const handleAuth = () => {
    if (wallet) {
      console.log("first fnc");
      setLoginBtnClicked(false);
      wallet.signIn();
    }
  };

  const handleAuth2 = () => {
    if (wallet) {
      console.log("second fnc");
      setLoginBtnClicked(true);
      wallet.signIn();
    }
  };

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      if (wallet) {
        isUserExist();
        if (!loading) {
          if (userExist) {
            router.push("/profile");
          } else {
            router.push("/create-profile");
          }
        }
      }
    }
  }, [signedAccountId]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }  `}
    >
      <div className="flex  items-center py-5 px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] font-extrabold xl:mr-8" href="#hero">
          Bug
          <span className="bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
            Bounty
          </span>
        </a>
        <nav
          className={` ${
            openNavigation ? "flex" : "hidden"
          }  fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent `}
        >
          <div
            className={`relative z-2 flex ${
              openNavigation && "gap-[5rem] mt-4 w-full"
            } flex-col items-center justify-center m-auto lg:flex-row`}
          >
            {navigation.map((item) => (
              <a
                onClick={() => toggleNavigation()}
                className={`block relative font-code text-sm lg:font-semibold  text-color-7 hover:text-n-1 transition-colors  px-6  lg:mr-0.25 lg:text-xs ${
                  item.url === pathname ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 `}
                key={item.id}
                href={item.url}
              >
                {item.title}
              </a>
            ))}
            {sign_in.map((item) => (
              <p
                onClick={wallet.signIn}
                key={item.id}
                className={`block relative font-code text-sm lg:font-semibold  text-color-7 hover:text-n-1 transition-colors ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6  lg:mr-0.25 lg:text-xs ${
                  item.url === pathname ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 `}
              >
                {item.title}
              </p>
            ))}
          </div>
          <HamburgerMenu />
        </nav>
        <p
          // href=""
          onClick={handleAuth2}
          className="button hidden mr-8 cursor-pointer text-color-7 transistion-colors hover:text-n-1 lg:block"
        >
          {loginBtnClicked && signedAccountId ? "loading..." : "Login"}
        </p>
        <Button
          onClick={() => handleAuth()}
          className="hidden lg:flex "
          href="#login"
        >
          {!loginBtnClicked && signedAccountId ? "loading..." : "Sign up"}
        </Button>

        <Button
          onClick={toggleNavigation}
          className="ml-auto lg:hidden"
          px="px-3"
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
