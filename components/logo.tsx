import Image from "next/image";
import React, { FC } from "react";

interface LogoProps {
  height?: number;
  width?: number;
}

const Logo: FC<LogoProps> = ({ height = 130, width = 130 }) => {
  return <Image height={height} width={width} src="/logo.svg" alt="logo" />;
};

export default Logo;
