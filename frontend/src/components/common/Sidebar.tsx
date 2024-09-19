import React, { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { IoBug } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);

  const menus = [
    // { name: "Home", link: "", icon: IoHomeSharp },
    {
      name: "Bounties",
      link: "/dashboard",
      icon: IoBug,
    },
    {
      name: "Teams",
      link: "",
      icon: IoIosPeople,
    },
  ];

  return (
    <aside
      className={` hidden lg:top-16 mt-[4rem] lg:h-[calc(100vh-theme(space.16))] lg:flex flex-col  ${
        open ? "w-60" : "w-[4.5rem]"
      } left-0 border-y-[transparent] border-l-[transparent] sticky border-r-white/10 border border-solid transition-[width,transform] duration-300 ease-in-out   top-0 h-full `}
    >
      <div className="py-3 flex justify-end ">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer text-color-7"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-8 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <div key={i} className="group">
            <div
              className={`flex items-center ${
                !open ? "justify-center pl-5" : ""
              } cursor-pointer text-sm gap-3.5 font-medium p-2 mx-2 hover:bg-white/10 rounded-md`}
              onClick={
                () =>
                  // !menu.subMenu
                  // ?
                  navigate(`${menu.link}`)
                // : setOpenSubMenu(!openSubMenu);
              }
            >
              <div
                // className={`${!open ? "" : "ml-[1.5rem]"}`}
                onClick={() => setOpen(!open)}
              >
                {React.createElement(menu.icon, {
                  size: "20",
                  color: "#9F9FA8",
                })}
              </div>
              <h3
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`text-color-7 whitespace-pre ${
                  !open && "opacity-0 translate-x-10 overflow-hidden "
                } duration-300`}
              >
                {menu.name}
              </h3>
              <h3
                style={{ color: "#fff" }}
                className={` ${
                  open && "hidden "
                } absolute z-50 bg-white/10 whitespace-pre text-color-7 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-[5rem] group-hover:duration-300 group-hover:w-fit `}
              >
                {menu.name}
              </h3>
              {/* {menu.subMenu && (
                <FaAngleDown
                  className={`flex justify-end text-white ${
                    openSubMenu && "rotate-180"
                  } `}
                />
              )} */}
            </div>
            {/* {menu.subMenu && openSubMenu && open && (
              <ul className="flex flex-col ml-[3rem] z-50  rounded-md ">
                {menu.subMenu.map((value, index) => (
                  <NavLink
                    to={value.link}
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? "my-2 hover:bg-[#bfa9c27e] z-50 rounded-md p-2  text-white text-sm flex font-bold  items-center"
                        : "my-2 hover:bg-[#bfa9c27e] z-50 rounded-md p-2 text-white text-sm flex font-bold items-center"
                    }
                  >
                    {value.name}
                  </NavLink>
                ))}
              </ul>
            )} */}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
