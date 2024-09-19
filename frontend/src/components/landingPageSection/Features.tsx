import React from "react";
import Section from "./Section";
import Heading from "../design/Heading";
import { benefits } from "../../constants";
import Arrow from "../../assets/svg/Arrow";
import { GradientLight } from "../design/Benefits";
import { Meteors } from "../ui/meteors";

const Features = () => {
  return (
    <Section id="features">
      <div className="container relative ">
        <Heading
          className="mb-[3rem] md:mt-[2rem] lg:mt-[4rem] md:mb-[5rem]"
          title="Built for "
          span="Developers"
        />
        <div className="grid relative  overflow-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {benefits.map((item) => (
            <div
              className="block z-0 relative p-0.5 bg-no-repeat 
                  bg-[length:100%_100%] md:max-w-[24rem] 
                  "
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative  flex flex-col min-h-[22rem] p-[2.4rem] ">
                <h5 className="text-[1.2rem] mb-5">{item.title}</h5>
                <p className="text-[.85rem] mb-6 text-color-7">{item.text}</p>
                <div className="flex  items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt="item.title"
                  />
                  <p
                    onClick={() => console.log("clicked")}
                    className="ml-auto z-2 cursor-pointer font-code text-xs text-n-1 uppercase tracking-wider font-bold "
                  >
                    Explore more
                  </p>
                  <Arrow />
                </div>
              </div>
              <Meteors className="overflow-hidden" number={20} />

              {/* {item.light && <GradientLight />} */}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;
