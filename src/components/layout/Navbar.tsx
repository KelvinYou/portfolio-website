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
import { usePathname } from 'next/navigation';

interface DropdownMenuProps {
  link: MainMenu;
}

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const { 
    link,
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
            "/exp" === link.link ? "text-white" : "text-secondary"
          } hover:text-white text-[18px] group`}
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown();
          }}
        >
          <div>
            {link.title}
          </div>
          <div className={`bg-gradient-to-r from-[#33bbcf] to-[#7de7eb] 
            h-1 rounded ${"/exp" === link.link ? "w-full" : "w-0"} group-hover:w-full transition-width ease-in-out 
            duration-200`}></div>
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
                  (active === menu.title) ? 
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
                    }}
                  >
                    <div
                      className={`${
                        active === menu.link ? "text-white" : "text-secondary"
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
  const pathname = usePathname();

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-gradient-to-b from-primary to-transparent backdrop-blur-lg`}
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
            return (
              <li
                key={link.id + index}
                className={`${
                  pathname === link.link ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer group`}
              >
                {link?.link ? (
                  <Link 
                    href={link.link} 
                    target={link.newTab ? '_blank' : '_self'}
                    rel="noreferrer noopener"
                  >
                    <div className='flex gap-2 group-hover:w-full'>
                      {link.title}
                      {link.newTab && <ExternalLink />}
                    </div>

                    <div className={`bg-gradient-to-r from-[#33bbcf] to-[#7de7eb] 
                      h-1 rounded ${pathname === link.link ? "w-full" : "w-0"} group-hover:w-full transition-width ease-in-out 
                      duration-200`}></div>
                  </Link>
                ) : (
                  <a href={`/#${link.id}`}>{link.title} <ExternalLink /></a>
                )}
                  
              </li>
            )

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
                      className='flex gap-2'
                    >
                      {navLink.title}
                      {navLink.newTab && <ExternalLink />}
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