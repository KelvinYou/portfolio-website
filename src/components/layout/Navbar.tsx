"use client";

import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image';

import { navLinks } from "@/constants";
import { logo, menu, close } from "@/assets";
import Link from 'next/link';
import "@/styles/index.scss";
import { careerData, personalData } from '@/constants/data';
import { MainMenu } from '@/constants/menu';
import { ExternalLink } from 'lucide-react';

interface DropdownMenuProps {
  link: MainMenu;
  parentActive: string;
  setParentActive: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const { 
    link,
    parentActive,
    setParentActive
  } = props;

  const [active, setActive] = useState(navLinks[0].title);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  }

  const closeDropdown = () => {
    setDropdownOpen(false);
  }

  const handleDocumentClick = (e: MouseEvent) => {
    // Close the dropdown if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    // Attach the click event listener when the component mounts
    document.addEventListener('click', handleDocumentClick);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="relative" ref={dropdownRef}>
      <li
        className={`text-secondary font-medium cursor-pointer`}
      >
        <a 
          className={`${
            parentActive === link.title ? "text-white" : "text-secondary"
          } hover:text-white text-[18px] `}
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown();
          }}
        >
          {link.title}
        </a>

        <div
          className={`${
            !isDropdownOpen ? "hidden" : "flex" 
          } ml-[-10px] py-6 black-gradient absolute mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
        >
          <ul className="list-none flex justify-end items-start flex-col gap-4">
            {link.subMenu && link.subMenu.map((menu: any, index: number) => (
              <li
                key={index}
                className={`${
                  ((parentActive == link.title) && (active === menu.title)) ? 
                  "text-white" : "text-secondary"
                }`}
              >
                {menu?.link && (
                  <Link 
                    href={menu.link} 
                    className=""
                    target={menu.newTab ? `_blank` : '_self'}
                    rel="noreferrer noopener"
                    onClick={() => {
                      closeDropdown();
                      setActive(menu.title);
                      setParentActive(link.title);
                    }}
                  >
                    <div
                      className={`${
                        active === menu.title ? "text-white" : "text-secondary"
                      } w-[140px] px-6  font-poppins font-medium cursor-pointer text-[16px]`}
                    >
                      {menu.title}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </li>
    </div>
  );
}

const Navbar: FC = () => {
  const [active, setActive] = useState("");
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
            {personalData.nickname}&nbsp;<span className="lg:block hidden">| {careerData.role}</span>
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
                  parentActive={active}
                  setParentActive={setActive}
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
                    <a href={`/#${link.id}`}>{link.title} <ExternalLink /></a>
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