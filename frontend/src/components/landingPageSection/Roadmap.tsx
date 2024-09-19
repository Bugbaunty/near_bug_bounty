import Heading from "../design/Heading";
import Section from "./Section";
import Tagline from "../design/TagLine";
import { roadmap } from "../../constants";
import { check2, grid, loading1 } from "../../assets";

const Roadmap = () => (
  <Section className="overflow-hidden mb-[2rem]" id="roadmap">
    <div className="container">
      <Heading className="mb-[3rem] md:my-[5rem]" title="Road" span="map" />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
        {roadmap.map((item) => {
          const status = item.status === "done" ? "Done" : "In progress";

          return (
            <div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                item.colorful ? "bg-conic-gradient" : "bg-n-6"
              }`}
              key={item.id}
            >
              <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
                <div className="absolute top-0 left-0 max-w-full">
                  <img
                    className="w-full"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div>
                <div className="relative z-1">
                  <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                    <Tagline className="text-[.6rem] lg:text-base">
                      {item.date}
                    </Tagline>

                    <div className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8">
                      <img
                        className="mr-2.5"
                        src={item.status === "done" ? check2 : loading1}
                        width={16}
                        height={16}
                        alt={status}
                      />
                      <div className="tagline text-[.6rem]">{status}</div>
                    </div>
                  </div>

                  <div className=" flex justify-center items-center mb-10 -my-10 -mx-15">
                    <img
                      className="w-[20rem] md:w-[25rem]"
                      src={item.imageUrl}
                      width={628}
                      height={426}
                      alt={item.title}
                    />
                  </div>
                  <h4 className="text-[1.2rem] mb-4">{item.title}</h4>
                  <p className="body-2 text-color-7">{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </Section>
);

export default Roadmap;
