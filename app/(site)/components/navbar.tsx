"use client";
import tw from "tailwind-styled-components";
import Link from "next/link";
import Logo from "@/components/global/logo";

import { UserButton, useUser } from "@clerk/nextjs";

import { MenuIcon } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const user = useUser().isSignedIn;

  // -------------------------------------- hooks --------------------------------------
  const ref = useRef(null);

  useGSAP(() => {
    //  make the container to come from under the screen

    gsap
      .from(ref.current, {
        y: -100,
        autoAlpha: 0,
        duration: 2,
        opacity: 0,
      })
      .delay(0.6);
  });

  return (
    <HeaderWrapper ref={ref}>
      <aside className="flex  items-center gap-[2px]">
        <Logo mode="dark" height={150} width={150} />
      </aside>

      <NavItems>
        <ul className="flex items-center text-muted-foreground gap-4 list-none ">
          <ListItem>
            <Link href="#">Home</Link>
          </ListItem>

          <ListItem>
            <Link href="#">Features</Link>
          </ListItem>

          <ListItem>
            <Link href="#">Pricing</Link>
          </ListItem>

          <ListItem>
            <Link href="#">About</Link>
          </ListItem>
        </ul>
      </NavItems>

      <aside className="flex items-center gap-4">
        <Link
          href={"/dashboard"}
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none  "
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {user ? "Dashboard" : "Get Started"}
          </span>
        </Link>
        {user ? <UserButton afterSignOutUrl="/" /> : null}
        <MenuIcon className="md:hidden" />
      </aside>
    </HeaderWrapper>
  );
};

export default Navbar;

const HeaderWrapper = tw.header`  relative   p-4 z-[100]  flex items-center  justify-between max-w-7xl mx-auto `;

const NavItems = tw.nav`absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block`;

const ListItem = tw.li`hover:underline hover:text-muted text-sm`;
