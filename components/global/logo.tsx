"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { FC } from "react";

interface LogoProps {
  height?: number;
  width?: number;
  mode?: "light" | "dark";
}

const Logo: FC<LogoProps> = ({ height = 130, width = 130, mode }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark" || mode === "dark";

  if (isDark) {
    return (
      <Image
        height={height}
        width={width}
        src="/logo-dark.svg"
        alt="logo-dark"
      />
    );
  }
  return <Image height={height} width={width} src="/logo.svg" alt="logo" />;
};

export default Logo;
