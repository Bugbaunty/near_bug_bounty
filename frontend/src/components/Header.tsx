import React, { useEffect, useState, useContext } from "react";
import { navigation, sign_in } from "../constants/index";
import { useRouter } from "next/router";
import Button from "./utils/Button";
import MenuSvg from "@/assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { BugBountyContract } from "@/config";

import { NearContext } from "../wallets/near";

const Header = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [openNavigation, setOpenNavigation] = useState<boolean>(false);

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
  const [action, setAction] = useState<(_e: any) => void>(() => {});
  const [label, setLabel] = useState("Loading...");

  const readData = async () => {
    const data = await wallet.viewMethod({
      contractId: BugBountyContract,
      method: "get_user",
      args: { account_id: signedAccountId },
    });
    if (!data) {
      router.push("/welcome");
    } else {
      console.log("User data: ", data);
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (!wallet) return;
    console.log("WALLET", wallet);
    console.log("SIGNEDACC", signedAccountId);

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout`);
      if (wallet) {
        readData();
      }

      // router.push("/create-bounty")
    } else {
      setAction(() => wallet.signIn);
      setLabel("Login");
    }
  }, [signedAccountId, wallet]);

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
          onClick={action}
          className="button hidden mr-8 cursor-pointer text-color-7 transistion-colors hover:text-n-1 lg:block"
        >
          {label}
        </p>
        <Button
          onClick={wallet.signIn}
          className="hidden lg:flex "
          href="#login"
        >
          Sign up
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
