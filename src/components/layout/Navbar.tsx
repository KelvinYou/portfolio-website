"use client";

import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image';

import { navLinks } from "@/constants";
import { logo, menu, close } from "@/assets";
import Link from 'next/link';
import "@/styles/index.scss";
import { MainMenu } from '@/constants/menu';

const DropdownMenu: FC<any> = (link) => {
  const [active, setActive] = useState(navLinks[0].title);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);;

  const toggleDropdown = () => {
    clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    // Delay the closing of the dropdown by a short time
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Adjust the delay time as needed
  };

  return (
    <div className="relative"         
      onMouseEnter={toggleDropdown}
      onMouseLeave={closeDropdown}
    >
      <li
        className={`text-secondary
        font-medium cursor-pointer`}
      >
        <a 
          className={`text-secondary hover:text-white text-[18px] `}
          onClick={(e) => e.preventDefault()}>
          Experiences
        </a>
        {isDropdownOpen && (
          <ul className="absolute top-8 left-0 bg-black shadow-md">
            {/* Add dropdown menu items here */}
            {link.link.subMenu.map((menu: any, index: number) => {
              return (
                <li
                  key={index}
                  className={`${
                    active === menu.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                  onClick={() => !menu?.newTab && setActive(menu.title)}
                >
                  {menu?.link ? (
                    <Link 
                      href={menu.link} 
                      target={menu.newTab ? `_blank` : '_self'}
                      rel="noreferrer noopener"
                      onClick={closeDropdown}
                    >
                      {menu.title}
                    </Link>
                  ) : (
                    <a href={`/#${menu.id}`}>{menu.title}</a>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </li>
    </div>
  );
}

const Navbar = () => {
  // state variables
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
          {navLinks.map((link, index) => {
            if (link.subMenu) {
              return (
                <DropdownMenu 
                  key={link.id + index}
                  link={link}
                />
              )
            } else {
              return (
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
              )
            }

          })}
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
                    navLink?.link && setToggle(!toggle);
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