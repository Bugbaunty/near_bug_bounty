import React from "react";
import { notificationImages } from "../../constants";
import { notification1 } from "../../assets";

interface Props {
  className?: String;
  title?: string;
}

const Notification = ({ className, title }: Props) => {
  return (
    <div
      className={`${className} flex items-center p-4 pr-6 bg-linear-3 backdrop-blur bg-opacity-25 shadow-lg border border-n-1/10 rounded-2xl gap-5`}
    >
      <img
        src={notification1}
        width={62}
        height={62}
        className="rounded-xl"
        alt=""
      />
      <div className="flex-1 ">
        <p className="mb-1 font-semibold text-[.8rem]">{title}</p>
        <div className="flex items-center justify-between">
          <ul className="flex -m-0.5">
            {notificationImages.map((item, index) => (
              <li
                key={index}
                className="flex w-6 h-6 border-2 border-n-12 rounded-full overflow-hidden"
              >
                <img
                  src={item}
                  className="w-full"
                  width={20}
                  height={20}
                  alt="item"
                />
              </li>
            ))}
          </ul>
          <div className="body-2 text-[.75rem] text-n-13 ">1m ago</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
