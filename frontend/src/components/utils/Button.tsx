import React from "react";
import ButtonSvg from "../../assets/svg/ButtonSvg";

interface Props {
  className?: string;
  onClick?: () => any;
  href?: string;
  children?: any;
  px?: string;
  white?: boolean;
}

const Button = ({ className, href, onClick, children, px, white }: Props) => {
  const classes = ` button relative inline-flex items-center 
    justify-center font-bold h-11 transition-colors  ${px || "px-7"}  ${
    white ? ` text-black ` : `hover:text-n-1 text-color-7`
  } ${className || ""}`;

  const spanClasses = "relative z-10";
  const renderButton = () => (
    <button onClick={onClick} className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  return renderButton();
};

export default Button;
