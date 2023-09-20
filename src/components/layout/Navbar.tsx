"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import { navLinks } from "@/constants";
import { logo, menu, close } from "@/assets";
import Link from 'next/link';
import "@/styles/index.scss";

const Navbar = () => {
  // state variables
  // console.log("path: ", window.location.pathname);
  const [active, setActive] = useState(navLinks[0].title);
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo.src} alt="Logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Kelvin You&nbsp;<span className="lg:block hidden">| Software Engineer</span>
          </p>
        </Link>

        {/* Nav Links (Desktop) */}
        <ul className="list-none hidden md:flex flex-row gap-10">
          {navLinks.map((link, index) => (
            <li
              key={link.id + index}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => !link?.newTab && setActive(link.title)}
            >
              {link?.link ? (
                <Link 
                  href={link.link} 
                  target={link.newTab ? `_blank` : '_self'}
                  rel="noreferrer noopener"
                >
                  {link.title}
                </Link>
              ) : (
                <a href={`/#${link.id}`}>{link.title}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <Image
            src={toggle ? close : menu}
            alt="Menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            {/* Nav Links (Mobile) */}
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((navLink) => (
                <li
                  key={navLink.id}
                  className={`${
                    active === navLink.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    !navLink?.link && setToggle(!toggle);
                    !navLink?.link && setActive(navLink.title);
                  }}
                >
                  {navLink?.link ? (
                    <Link 
                      href={navLink.link} 
                      target={navLink.newTab ? `_blank` : '_self'}
                      rel="noreferrer noopener"
                    >
                      {navLink.title}
                    </Link>
                  ) : (
                    <a href={`/#${navLink.id}`}>{navLink.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar