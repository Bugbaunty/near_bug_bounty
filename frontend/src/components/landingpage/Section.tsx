import React from "react";
import SectionSvg from "../../assets/svg/SectionSvg";

type props = {
  className?: any;
  id?: any;
  crosses?: any;
  crossesOffset?: any;
  customPaddings?: any;
  children?: any;
};

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}: props) => {
  return (
    <div
      id={id}
      className={`relative ${
        customPaddings ||
        `py-10 mt-8  ${crosses ? `lg:py-32 xl:py-40` : ``} ${className || ""} `
      }`}
    >
      {children}
      <div className="hidden absolute left-5 top-0 w-0 25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10"></div>
      <div className="hidden absolute left-5 top-0 w-0 25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10"></div>

      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left-10 right-10`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </div>
  );
};

export default Section;
